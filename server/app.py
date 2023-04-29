from flask import Flask, render_template, request, jsonify
from sklearn import preprocessing
from sklearn.compose import ColumnTransformer
import scipy, joblib
import pandas as pd
import numpy as np
import math
import googlemaps
from pymongo import MongoClient
from datetime import datetime
from schema import User
import os
from dotenv import load_dotenv

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

    response = {
        "route_with_lowest_fuel_consumption": min_fuel_consumption_route["summary"],
        "distance_fuel": min_fuel_consumption_route["legs"][0]["distance"]["text"],
        "duration_fuel": min_fuel_consumption_route["legs"][0]["duration"]["text"],
        "fuel_consumption_litres": min_fuel_consumption,
        "route_with_lowest_time_taken": min_time_route["summary"],
        "distance_time": min_time_route["legs"][0]["distance"]["text"],
        "duration_time": min_time_route["legs"][0]["duration"]["text"],
    }

    # return the dictionary as a JSON response
    return jsonify(response)


@app.route("/calculate_co2", methods=["POST"])
def calculate_co2():
    # Get the form inputs
    make = request.form["make"]
    model = request.form["model"]
    vehicle_class = request.form["vehicle_class"]
    engine_size = request.form["engine_size"]
    cylinders = request.form["cylinders"]
    transmission = request.form["transmission"]
    fuel = request.form["fuel"]
    mileage = request.form["mileage"]

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
                235.215/mileage,
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
            "Fuel Consumption City (L/100km)",
            "Fuel Consumption Hwy (L/100km)",
            "Fuel Consumption Comb (L/100km)",
            "Fuel Consumption Comb (mpg)",
        ],
    )
    print(data.head())

    # Here are the categorical features we are going to create one-hot encoded features for
    categorical_features = [
        "manufacturer",
        "model",
        "description",
        "transmission",
        "transmission_type",
        "fuel",
        "powertrain",
    ]

    # Concatenate the input data with the missing columns
    encoder = preprocessing.OneHotEncoder(handle_unknown="ignore")
    one_hot_features = encoder.fit_transform(data[categorical_features])
    one_hot_names = encoder.get_feature_names_out()
    num_new_columns = 3521 - len(
        one_hot_names
    )  # Change this to the number of new columns you want to add
    null_columns = np.zeros((one_hot_features.shape[0], num_new_columns))

    # Convert the null columns to a CSR matrix
    null_columns_csr = scipy.sparse.csr_matrix(null_columns)
    numerical_feature_names = ["engine_size_cm3", "power_ps"]
    one_hot_features = scipy.sparse.hstack((one_hot_features, null_columns_csr))
    numerical_features = data[numerical_feature_names]

    scaler = preprocessing.MinMaxScaler()
    numerical_features = scaler.fit_transform(
        numerical_features
    )  # Need to scale numerical features for ridge regression

    # Combine numerical features with one-hot-encoded features
    features = scipy.sparse.hstack((numerical_features, one_hot_features), format="csr")
    model = joblib.load(
        "C:/Hackathons/SE Hackathon/trial_web/model/ridge_fit_full.joblib"
    )
    prediction = model.predict(features)
    response = {"emission (gram per KM)": prediction[0]}
    # Return the result
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



if __name__ == "__main__":
    app.run(debug=True)
