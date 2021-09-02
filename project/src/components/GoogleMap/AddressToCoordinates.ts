import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const AddressToCoordinates = async (address: string[]) => {
    const latLng = [];
    for (const key in address) {
        const results = await geocodeByAddress(address[key]);
        const coords: google.maps.LatLngLiteral = await getLatLng(results[0]);
        latLng.push(coords);
    }
    return latLng;
};

export default AddressToCoordinates;
