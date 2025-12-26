from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="puviintel")

def geocode_location(location_name: str):
    try:
        loc = geolocator.geocode(location_name)
        if loc:
            return {
                "name": location_name,
                "lat": loc.latitude,
                "lon": loc.longitude
            }
        return None
    except:
        return None


def geocode_locations(locations: list):
    results = []
    for loc in locations:
        info = geocode_location(loc)
        if info:
            results.append(info)
    return results

def to_geojson(geo_list):
    features = []

    for item in geo_list:
        features.append({
            "type": "Feature",
            "properties": {
                "name": item["name"]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [item["lon"], item["lat"]]
            }
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }
