import googlemaps
from itertools import permutations
import os

from dotenv import load_dotenv

load_dotenv()

# Define the API key, client and travel mode
API_KEY = os.getenv("API_KEY")

# Create client object for Google Maps API
gmaps = googlemaps.Client(API_KEY)


def calculate_distance(origin, destination):
    """Calculate distance between two points using Google Maps API."""
    result = gmaps.distance_matrix(origin, destination, mode="walking")
    return result["rows"][0]["elements"][0]["distance"]["value"]


def solve_tsp(places):
    """Solve the travelling salesman problem for the given places."""
    # Generate all possible permutations of the places
    permutations_list = permutations(places)

    # Set the initial best route to be None and the initial best distance to be infinity
    best_route = None
    best_distance = float("inf")

    # Loop over all the permutations and calculate their total distance
    for perm in permutations_list:
        # Calculate the total distance of this route
        distance = 0
        for i in range(len(perm) - 1):
            distance += calculate_distance(perm[i], perm[i + 1])

        # Check if this route is better than the current best route
        if distance < best_distance:
            best_distance = distance
            best_route = perm

    # Apply 2-opt algorithm to optimize the route
    best_route = two_opt(best_route)

    # Return the best route and its distance
    return best_route, best_distance


def two_opt(route):
    """Apply the 2-opt algorithm to the given route and return the optimized route."""
    # Make a copy of the route
    new_route = list(route)

    # Set the initial improvement to be some large value
    improvement = float("inf")

    # Loop until no further improvement can be made
    while improvement > 0:
        improvement = 0
        for i in range(1, len(new_route) - 2):
            for j in range(i + 1, len(new_route)):
                if j - i == 1:
                    continue
                # Apply 2-opt move to the route
                if calculate_distance(new_route[i - 1], new_route[j - 1]) + calculate_distance(
                    new_route[i], new_route[j]
                ) < calculate_distance(new_route[i - 1], new_route[i]) + calculate_distance(
                    new_route[j - 1], new_route[j]
                ):
                    new_route[i:j] = list(reversed(new_route[i:j]))
                    improvement += 1
        route = new_route

    # Return the optimized route
    return new_route


def print_route(route):
    """Print the given route with the total distance."""
    print(" -> ".join(route))
    distance = 0
    for i in range(len(route) - 1):
        distance += calculate_distance(route[i], route[i + 1])
    print("Total Distance: {} kilometers".format(distance/1000))


if __name__ == "__main__":
    places = ["Kalyan", "Dadar", "Thane", "Andheri", "Pune"]
    route, distance = solve_tsp(places)
    print_route(route)
