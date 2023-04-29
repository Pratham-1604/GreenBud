import googlemaps
import math
import os

from dotenv import load_dotenv

load_dotenv()

# Define the API key, client and travel mode
API_KEY = os.getenv("API_KEY")
gmaps = googlemaps.Client(key=API_KEY)
mode = "driving"

# Define origin and destination
origin = "Pune"
destination = "Dadar"

# Request directions from the Google Maps API
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
    mileage = 14.0  # assuming an average mileage of 14 km/litre
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

# Print the route with the lowest fuel consumption
min_fuel_consumption = min(fuel_consumptions)
min_fuel_consumption_route = routes[fuel_consumptions.index(min_fuel_consumption)]
print("Route with lowest fuel consumption:")
print(min_fuel_consumption_route["summary"])
print("Distance:", min_fuel_consumption_route["legs"][0]["distance"]["text"])
print("Duration:", min_fuel_consumption_route["legs"][0]["duration"]["text"])
print("Fuel Consumption (Litres):", min_fuel_consumption)

# Print the route with the lowest time taken
min_time_route = min(routes, key=lambda route: route["legs"][0]["duration"]["value"])
print("\nRoute with lowest time taken:")
print(min_time_route["summary"])
print("Distance:", min_time_route["legs"][0]["distance"]["text"])
print("Duration:", min_time_route["legs"][0]["duration"]["text"])
