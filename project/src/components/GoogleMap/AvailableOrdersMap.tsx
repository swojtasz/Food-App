import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AvailableOrdersMap: React.FC<{
    orderMarkers?: google.maps.LatLngLiteral[];
}> = (props) => {
    const mapContainerStyle = {
        width: "100%",
        height: "30rem",
    };

    const dispatch = useDispatch();

    const [currentLocation, setCurrentLocation] =
        useState<google.maps.LatLngLiteral>();
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
    }, [currentLocation, dispatch]);

    const markers = props.orderMarkers!.map((marker, idx) => (
        <Marker position={marker} key={idx} />
    ));

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={6}
                center={currentLocation}
            >
                {markers}
            </GoogleMap>
        </>
    );
};

export default AvailableOrdersMap;
