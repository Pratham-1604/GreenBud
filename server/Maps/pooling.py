import itertools
import googlemaps
from datetime import datetime


# Sample hardcoded user data
user1 = {
    "name": "Arshad",
    "origin": "Kalyan",
    "destination": "Andheri",
    "time": datetime(2023, 5, 1, 8),
    "capacity": 3,
}

user2 = {
    "name": "Vikas",
    "origin": "Pune",
    "destination": "Andheri",
    "time": datetime(2023, 5, 1, 8, 0, 0),
    "capacity": 2,
}
    
user3 = {
    "name": "Prathamesh",
    "origin": "Andheri",
    "destination": "Pune",
    "time": datetime(2023, 5, 1, 8, 0, 0),
    "capacity": 4,
}

# Set up Google Maps API client
gmaps = googlemaps.Client(key='AIzaSyDYKrqo4uZx9j0S9D0PeH8fBxarOTswUNg')

# Get directions for each user
user1_directions = gmaps.directions(user1["origin"], user1["destination"], mode="driving", departure_time=user1["time"])
user2_directions = gmaps.directions(user2["origin"], user2["destination"], mode="driving", departure_time=user2["time"])
user3_directions = gmaps.directions(user3["origin"], user3["destination"], mode="driving", departure_time=user3["time"])

# Combine all directions into a single list
all_directions = [(user1, user1_directions[0]["legs"][0]),
                 (user2, user2_directions[0]["legs"][0]), 
                 (user3, user3_directions[0]["legs"][0])]

# Sort directions by distance
all_directions_sorted = sorted(all_directions, key=lambda x: x[1]["distance"]["value"])

# Initialize a list to keep track of which users will share a ride
shared_rides = gmaps.directions(user1["origin"], user1["destination"], mode="driving", departure_time=user1["time"])

def check_time(user1, user2):
    duration1 = gmaps.directions(user1["origin"], user1["destination"])[0]['legs'][0]['duration']['text']
    duration2 = gmaps.directions(user2["origin"], user2["destination"])[0]['legs'][0]['duration']['text']x
for user, direction in all_directions_sorted:
    # Check if this user has already been assigned to a shared ride
    if user not in itertools.chain(*shared_rides):
        # Initialize a new shared ride
        ride = [user]
        route = direction["steps"]
        remaining_capacity = user["capacity"]
        for other_user, other_direction in all_directions_sorted:
            # Check if this other user can be added to the shared ride
            if other_user != user and other_user not in itertools.chain(*shared_rides) and remaining_capacity >= other_user["capacity"]:
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
        print(", ".join([user["name"] for user in ride]))
else:
    print("No shared rides")
