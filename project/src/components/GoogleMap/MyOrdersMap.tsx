import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import { LocalizationUsage } from "../../types/LocalizationUsage";
import { MapPoint } from "../../types/MapPoint";
import { OptimalCostAndRoute } from "../../types/OptimalCostAndRoute";
import CreateChildren from "../../utils/CreateChildren";
import Traverse from "../../utils/Traverse";

const MyOrdersMap: React.FC<{
    restaurantMarkers: google.maps.LatLngLiteral[];
    clientMarkers: google.maps.LatLngLiteral[];
}> = (props) => {
    const mapContainerStyle = {
        width: "100%",
        height: "30rem",
    };

    const [currentLocation, setCurrentLocation] =
        useState<google.maps.LatLngLiteral>();
    const [optimals, setOptimals] = useState<OptimalCostAndRoute>();
    const [directions, setDirections] =
        useState<google.maps.DirectionsResult>();

    useEffect(() => {
        if (!currentLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else if (!!currentLocation && !optimals) {
            const origin: MapPoint = {
                cost: 0,
                localization: currentLocation,
                children: [],
            };

            const restaurants: LocalizationUsage[] =
                props.restaurantMarkers.map((restaurant) => {
                    return { localization: restaurant, isUsed: false };
                });

            const clients: LocalizationUsage[] = props.clientMarkers.map(
                (client) => {
                    return { localization: client, isUsed: false };
                }
            );

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
                setOptimals(optimalCostAndRoute);
            };

            countOptimals();
        } else if (!!currentLocation && !!optimals) {
            const DirectionsService = new google.maps.DirectionsService();
            const lastOptimalsElement = optimals!.route.length - 1;

            const waypoints = optimals.route.map((route) => {
                return {
                    location: new google.maps.LatLng(route),
                    stopover: true,
                };
            });
            waypoints.pop();
            waypoints.shift();

            DirectionsService.route(
                {
                    origin: currentLocation,
                    waypoints: waypoints,
                    destination: optimals.route[lastOptimalsElement],
                    travelMode: google.maps.TravelMode.BICYCLING,
                    optimizeWaypoints: false,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result!);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [
        currentLocation,
        props.clientMarkers,
        props.restaurantMarkers,
        optimals,
    ]);

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
        </>
    );
};

export default MyOrdersMap;
