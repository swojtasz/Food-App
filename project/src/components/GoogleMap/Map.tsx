import { GoogleMap, Marker } from "@react-google-maps/api";

const Map: React.FC<{
    restaurantMarker: google.maps.LatLngLiteral;
    clientMarker: google.maps.LatLngLiteral;
}> = (props) => {
    const mapContainerStyle = {
        width: "60rem",
        height: "30rem",
    };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={props.restaurantMarker}
        >
            <Marker position={props.restaurantMarker}></Marker>
            <Marker position={props.clientMarker}></Marker>
        </GoogleMap>
    );
};

export default Map;
