import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import GetDurations from "./GetDurations";

const Map: React.FC<{
    restaurantMarker: google.maps.LatLngLiteral;
    clientMarker: google.maps.LatLngLiteral;
}> = (props) => {
    const mapContainerStyle = {
        width: "60rem",
        height: "30rem",
    };

    const [currentLocation, setCurrentLocation] =
        useState<google.maps.LatLngLiteral>();
    const [directions, setDirections] =
        useState<google.maps.DirectionsResult>();
    const [duration, setDuration] = useState<string[]>([]);

    useEffect(() => {
        // set current position
        if (!currentLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }

        if (!!currentLocation) {
            const DirectionsService = new google.maps.DirectionsService();

            // set route
            DirectionsService.route(
                {
                    origin: currentLocation,
                    destination: props.clientMarker,
                    waypoints: [
                        {
                            location: new google.maps.LatLng(
                                props.restaurantMarker.lat,
                                props.restaurantMarker.lng
                            ),
                        },
                    ],

                    travelMode: google.maps.TravelMode.BICYCLING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result!);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );

            const origins = [currentLocation, props.restaurantMarker];
            const destinations = [props.restaurantMarker, props.clientMarker];

            setDuration(GetDurations(origins, destinations));
        }
    }, [currentLocation, props.clientMarker, props.restaurantMarker]);

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={currentLocation}
            >
                {/* <Marker position={props.restaurantMarker}></Marker>
            <Marker position={props.clientMarker}></Marker> */}
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
            {duration && (
                <>
                    <p>Punkt A-B: {duration[0]}</p>
                    <p>Punkt B-C: {duration[3]}</p>
                </>
            )}
        </>
    );
};

export default Map;