from flask import Flask, render_template, request, jsonify
from sklearn import preprocessing
from sklearn.compose import ColumnTransformer
import scipy, joblib
import pandas as pd
import numpy as np
import math
import googlemaps
from pymongo import MongoClient
from datetime import datetime, timedelta
from schema import User
import os
from dotenv import load_dotenv
from flask_cors import CORS
import itertools
# add above line

load_dotenv()

# Define the API key, client and travel mode
API_KEY = os.getenv("API_KEY")
gmaps = googlemaps.Client(key=API_KEY)

# Define the MongoDB connection string and database name
connection_string = os.getenv("CONNECTION_STRING")

database_name = os.getenv("DATABASE_NAME")

# Create a MongoDB client
client = MongoClient(connection_string)

# Get the database
db = client[database_name]

# Get the users collection
users_collection = db["users"]
notif_collection = db['notifications']

app = Flask(__name__)
CORS(app) # add this []


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/create_user", methods=["POST"])
def add_user():
    data = request.get_json()
    name = data["name"]
    phone_number = data["phone_number"]
    email = data["email"]
    password = data["password"]
    # puc_expiry_date_str = data["puc_expiry_date"]
    # puc_expiry_date = datetime.strptime(puc_expiry_date_str, "%Y-%m-%d")

    new_user = User(
        name=name,
        phone_number=phone_number,
        email=email,
        password=password,
    )

    # Insert the user document into the users collection
    users_collection.insert_one(new_user.dict())
    response = {"success": True, "message": "User data added successfully"}
    return jsonify(response)


# Define the route for the fuel consumption calculation
@app.route("/fuel", methods=["POST"])
def fuel():
    # Get the origin and destination from the form data
    data = request.get_json()
    origin = data["origin"]
    destination = data["destination"]
    mileage = data["mileage"]

    # Request directions from the Google Maps API
    mode = "driving"
    routes = gmaps.directions(
        origin=origin,
        destination=destination,
        mode=mode,
        alternatives=True,
    )

    # Calculate fuel consumption for each route
    fuel_consumptions = []
    for route in routes:
        distance = route["legs"][0]["distance"]["value"] / 1000.0
        mileage = mileage  # assuming an average mileage of 14 km/litre
        driving_time = 0
        idle_time = 0
        for step in route["legs"][0]["steps"]:
            driving_time += step["duration"]["value"]
            if "traffic_speed_entry" in step:
                idle_time += (
                    step["duration"]["value"] - step["duration_in_traffic"]["value"]
                )
        fuel_consumption = (distance / mileage) * (1 + (idle_time / driving_time))
        fuel_consumptions.append(math.ceil(fuel_consumption))

    # Get the routes with the lowest fuel consumption and lowest time taken
    min_fuel_consumption = min(fuel_consumptions)
    min_fuel_consumption_route = routes[fuel_consumptions.index(min_fuel_consumption)]
    min_time_route = min(
        routes, key=lambda route: route["legs"][0]["duration"]["value"]
    )
    distance = min_time_route["legs"][0]["distance"]["value"] / 1000.0
    mileage = mileage  # assuming an average mileage of 14 km/litre
    driving_time = 0
    idle_time = 0
    for step in min_time_route["legs"][0]["steps"]:
        driving_time += step["duration"]["value"]
        if "traffic_speed_entry" in step:
            idle_time += (
                step["duration"]["value"] - step["duration_in_traffic"]["value"]
            )
        fuel_consumption_min_time = (distance / mileage) * (1 + (idle_time / driving_time))

    response = {
        "lowest_fuel_consumption_route": {
            "summary": min_fuel_consumption_route["summary"],
            "distance": min_fuel_consumption_route["legs"][0]["distance"]["text"],
            "duration": min_fuel_consumption_route["legs"][0]["duration"]["text"],
            "fuel_consumption_litres": min_fuel_consumption,
        },
        "lowest_time_taken_route": {
            "summary": min_time_route["summary"],
            "distance": min_time_route["legs"][0]["distance"]["text"],
            "duration": min_time_route["legs"][0]["duration"]["text"],
            "fuel_consumption_litres": math.ceil(fuel_consumption_min_time),
        }
    }
    return jsonify(response)


@app.route("/calculate_co2", methods=["POST"])
def calculate_co2():
    # Get the form inputs
    data = request.get_json()
    print("data")
    print(data)

    print("request")
    print(request)

    make = data["make"]
    model = data["model"]
    vehicle_class = data["vehicle_class"]
    engine_size = data["engine_size"]
    cylinders = data["cylinders"]
    transmission = data["transmission"]
    fuel = data["fuel"]
    mileage = data["mileage"]

    data = pd.DataFrame(
        [
            (
                make,
                model,
                vehicle_class,
                engine_size,
                cylinders,
                transmission,
                fuel,
                mileage,
                mileage,
                mileage,
                235.215/float(mileage)
            )
        ],
        columns=[
            "Make",
            "Model",
            "Vehicle Class",
            "Engine Size(L)",
            "Cylinders",
            "Transmission",
            "Fuel Type",
            "Fuel Consumption City (L/100 km)",
            "Fuel Consumption Hwy (L/100 km)",
            "Fuel Consumption Comb (L/100 km)",
            "Fuel Consumption Comb (mpg)",
        ],
    )
    print(data.head())
    import joblib
    # RF = joblib.load("C:/Hackathons/SE Hackathon/greenbud/GreenBud/server/model/RF_model.joblib")
    RF = joblib.load("./model/RF_model.joblib")
    prediction = RF.predict(data)
    response = {
        "emission (g/km)": prediction[0]
    }
    return jsonify(response)


# Notifications
@app.route('/createNotif', methods=['POST'])
def create_notif():
    data = request.json
    notif_id = notif_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Notification created successfully!', 'notif_id': str(notif_id)})

@app.route('/getNotif', methods=['GET'])
def get_notif():
    notifs = notif_collection.find({})
    result = []
    for notif in notifs:
        notif_data = {}
        notif_data['sender_id'] = notif['sender_id']
        notif_data['sender_name'] = notif['sender_name']
        notif_data['receiver_id'] = notif['receiver_id']
        notif_data['receiver_name'] = notif['receiver_name']
        notif_data['message'] = notif['message']
        notif_data['sender_email'] = notif['sender_email']
        notif_data['_id'] = str(notif['_id'])
        result.append(notif_data)

    return jsonify(result)

@app.route('/pooling', methods = ["POST"])
def pooling():
    data = request.get_json()
    user = data
    # Sample hardcoded user data
    user1 = {
        "name": "Arshad",
        "origin": "Kalyan",
        "destination": "Andheri",
        "time": datetime(2023, 5, 1, 9, 45, 15),
        "capacity": 3
    }

    user2 = {
        "name": "Vikas",
        "origin": "Pune",
        "destination": "Andheri",
        "time": datetime(2023, 5, 1, 8, 0, 0),
        "capacity": 2
    }

    user3 = {
        "name": "Prathamesh",
        "origin": "Andheri",
        "destination": "Pune",
        "time": datetime(2023, 9, 1, 8, 0, 0),
        "capacity": 4
    }
    users = [user1, user2, user3, user]
    # Get directions for each user
    user1_directions = gmaps.directions(user1["origin"], user1["destination"], mode="driving", departure_time=user1["time"])
    user2_directions = gmaps.directions(user2["origin"], user2["destination"], mode="driving", departure_time=user2["time"])
    user3_directions = gmaps.directions(user3["origin"], user3["destination"], mode="driving", departure_time=user3["time"])
    user_directions = gmaps.directions(user["origin"], user["destination"], mode="driving", departure_time=user["time"])
    # Combine all directions into a single list
    all_directions = [(user1, user1_directions[0]["legs"][0]),
                    (user2, user2_directions[0]["legs"][0]),
                    (user3, user3_directions[0]["legs"][0]),
                    (user, user_directions[0]["legs"][0])]

    # Sort directions by distance
    all_directions_sorted = sorted(all_directions, key=lambda x: x[1]["distance"]["value"])

    # Initialize a list to keep track of which users will share a ride
    shared_rides = []

    # Iterate through each user's direction and find overlapping routes
    for user, direction in all_directions_sorted:
        # Check if this user has already been assigned to a shared ride
        if user not in itertools.chain(*shared_rides):
            # Initialize a new shared ride
            # print(f"Checking User : {user}")
            ride = [user]
            route = direction["steps"]
            remaining_capacity = user["capacity"]
            for other_user, other_direction in all_directions_sorted:
                # Check if this other user can be added to the shared ride
                if other_user != user and other_user not in itertools.chain(*shared_rides) and remaining_capacity >= 1:
                    # print(f"Checking Other User : {other_user}")
                    # print((other_direction["duration"]["value"] - direction["duration"]["value"]))
                    other_user_start_time = other_user["time"] + timedelta(seconds=(other_direction["duration"]["value"] - direction["duration"]["value"]))  # Calculate other user's start time at this point
                    # print(other_user_start_time)
                    # print(user["time"] + timedelta(minutes = 10))
                    if other_user_start_time <= (user["time"] + timedelta(minutes = 10)) and other_user_start_time >= (user["time"] - timedelta(minutes = 10)) :
                        for step in other_direction["steps"]:
                            # Check if this other user's route overlaps with the current shared route
                            if step["start_location"] == route[-1]["end_location"]:
                                route.append(step)
                        ride.append(other_user)
                        remaining_capacity -= other_user["capacity"]
            # Add the ride to the list of shared rides
            shared_rides.append(ride)

    # Print the shared rides
    if len(shared_rides) > 0:
        print("Shared Rides:")
        for ride in shared_rides:
            shared = [", ".join([user["name"] for user in ride])]
        response = {
            "Shared Rides": shared
        }
        return jsonify(response)
    else:
        return -1
    


if __name__ == "__main__":
    app.run(debug=True)
