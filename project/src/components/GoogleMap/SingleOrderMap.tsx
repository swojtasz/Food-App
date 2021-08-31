import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import { LocalizationUsage } from "../../types/LocalizationUsage";
import { MapPoint } from "../../types/MapPoint";
import { OptimalCostAndRoute } from "../../types/OptimalCostAndRoute";
import CreateChildren from "./CreateChildren";
import GetDurations from "./GetDurations";
import Traverse from "./Traverse";

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
    const [duration, setDuration] = useState<number[]>([]);

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

            GetDurations(origins, destinations).then((value) => {
                setDuration(value);
            });

            const origin: MapPoint = {
                cost: 0,
                localization: currentLocation,
                children: [],
            };

            const restaurants: LocalizationUsage[] = [
                { localization: props.restaurantMarker, isUsed: false },
                { localization: props.clientMarker, isUsed: false },
            ]; //temporary
            const clients: LocalizationUsage[] = [
                { localization: props.clientMarker, isUsed: false },
                { localization: props.restaurantMarker, isUsed: false },
            ];

            const optimalCostAndRoute: OptimalCostAndRoute = {
                cost: Number.MAX_VALUE,
                route: [],
            };

            const countOptimals = async () => {
                await CreateChildren(origin, restaurants, clients);
                await Traverse(
                    origin,
                    optimalCostAndRoute,
                    [currentLocation],
                    0
                );
                console.log(optimalCostAndRoute);
            };

            countOptimals();
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
