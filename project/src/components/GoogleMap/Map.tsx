import { GoogleMap, Marker } from "@react-google-maps/api";

const Map: React.FC<{ coordinates: google.maps.LatLngLiteral }> = (props) => {
    const mapContainerStyle = {
        width: "100%",
        height: "70vh",
    };

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={props.coordinates}
            >
                <Marker position={props.coordinates}></Marker>
            </GoogleMap>
        </div>
    );
};

export default Map;
