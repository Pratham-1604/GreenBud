import googlemaps
import itertools
import math

# Define the API key, client, and travel mode
API_KEY = "AIzaSyDYKrqo4uZx9j0S9D0PeH8fBxarOTswUNg"
gmaps = googlemaps.Client(key=API_KEY)
mode = "driving"

# Define the number of stops and generate a list of stops
num_stops = int(input("Enter the number of places: "))
stops = []
for i in range(num_stops):
    stop = input("Enter place {}: ".format(i+1))
    stops.append(stop)

# Get the latitude-longitude coordinates for each stop
stop_coords = []
for stop in stops:
    result = gmaps.geocode(stop)
    lat_lng = result[0]["geometry"]["location"]
    stop_coords.append((lat_lng["lat"], lat_lng["lng"]))

# Calculate all possible permutations of stops
permutations = list(itertools.permutations(stop_coords))

# Initialize variables to hold the shortest route, lowest fuel consumption route, and lowest time taken route
shortest_route = None
shortest_distance = float("inf")
lowest_fuel_consumption_route = None
lowest_fuel_consumption = float("inf")
lowest_time_route = None
lowest_time = float("inf")

# Iterate through all possible permutations of stops
for perm in permutations:
    # Construct the list of waypoints from the permutation of stops
    waypoints = []
    for stop in perm:
        waypoints.append(stop)

    # Request directions from the Google Maps API
    routes = gmaps.directions(
        origin=stops[0],
        destination=stops[-1],
        mode=mode,
        waypoints=waypoints[1:-1],
        optimize_waypoints=True,
    )

    # Calculate fuel consumption for each route
    fuel_consumptions = []
    for route in routes:
        distance = route["legs"][0]["distance"]["value"] / 1000.0
        mileage = 14.0  # assuming an average mileage of 14 km/litre
        driving_time = 0
        idle_time = 0
        for step in route["legs"][0]["steps"]:
            driving_time += step["duration"]["value"]
            if "traffic_speed_entry" in step:
                idle_time += (
                    step["duration"]["value"] - step["duration_in_traffic"]["value"]
                )
        print("Distance: ", distance)
        print("Mileage: ", mileage)
        print("Idle Time: ", idle_time)
        print("Driving Time: ", driving_time)

        fuel_consumption = (distance / mileage) * (1 + (idle_time / driving_time))
        fuel_consumptions.append(math.ceil(fuel_consumption))

    # Calculate the total distance and time taken for each route
    total_distance = sum(route["legs"][0]["distance"]["value"] for route in routes)
    total_time = sum(route["legs"][0]["duration"]["value"] for route in routes)

    # Check if the current route is the shortest, lowest fuel consumption, or lowest time taken route
    if total_distance < shortest_distance:
        shortest_distance = total_distance
        shortest_route = routes
        shortest_perm = perm
    if min(fuel_consumptions) < lowest_fuel_consumption:
        lowest_fuel_consumption = min(fuel_consumptions)
        lowest_fuel_consumption_route = routes[fuel_consumptions.index(lowest_fuel_consumption)]
        lowest_fuel_consumption_perm = perm
    if total_time < lowest_time:
        lowest_time = total_time
        lowest_time_route = routes
        lowest_time_perm = perm

# Print the results
print("Shortest Route:")
print(shortest_route[0]["summary"])
print("Distance:", shortest_route[0]["legs"][0]["distance"]["text"])
print("Duration:", shortest_route[0]["legs"][0]["duration"]["text"])
print("Stops:", shortest_perm)

print("Lowest Fuel Consumption Route:")
print(lowest_fuel_consumption_route["summary"])
print("Distance:", lowest_fuel_consumption_route["legs"][0]["distance"]["text"])
print("Duration:", lowest_fuel_consumption_route["legs"][0]["duration"]["text"])
print("Fuel Consumed : ",lowest_fuel_consumption)
print("Order of stops:", lowest_fuel_consumption_perm)

print("Lowest Time Route:")
print(lowest_time_route[0]["summary"])
print("Distance:", lowest_time_route[0]["legs"][0]["distance"]["text"])
print("Duration:", lowest_time_route[0]["legs"][0]["duration"]["text"])
print("Order of stops:", lowest_time_perm)