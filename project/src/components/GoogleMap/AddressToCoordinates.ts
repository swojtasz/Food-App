import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const AddressToCoordinates = async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng: google.maps.LatLngLiteral = await getLatLng(results[0]);
    return latLng;
};

export default AddressToCoordinates;
