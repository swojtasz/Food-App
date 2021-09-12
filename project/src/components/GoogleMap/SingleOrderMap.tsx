import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { durationsActions } from "../../store/durations-slice";
import GetDurations from "../../utils/GetDurations";

const SingleOrderMap: React.FC<{
    restaurantMarker: google.maps.LatLngLiteral;
    clientMarker: google.maps.LatLngLiteral;
}> = (props) => {
    const mapContainerStyle = {
        width: "100%",
        height: "30rem",
    };

    const dispatch = useDispatch();

    const [currentLocation, setCurrentLocation] =
        useState<google.maps.LatLngLiteral>();
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
        }

        if (!!currentLocation) {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route(
                {
                    origin: currentLocation,
                    destination: props.clientMarker,
                    waypoints: [
                        {
                            location: new google.maps.LatLng(
                                props.restaurantMarker
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
                const courierToRestaurantTime = Math.floor(value[0] / 60);
                const restaurantToClientTime = Math.floor(value[3] / 60);

                dispatch(
                    durationsActions.setCourierToRestaurantTime(
                        courierToRestaurantTime
                    )
                );
                dispatch(
                    durationsActions.setRestaurantToClientTime(
                        restaurantToClientTime
                    )
                );
            });
        }
    }, [currentLocation, props.clientMarker, props.restaurantMarker, dispatch]);

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={currentLocation}
            >
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </>
    );
};

export default SingleOrderMap;
