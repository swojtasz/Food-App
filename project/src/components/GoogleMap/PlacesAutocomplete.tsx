import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from "react";

const PlacesAutocompleteComponent: React.FC<{
    onSetAddress: (address: string) => void;
}> = (props) => {
    const onSetAddress = (value: string) => {
        setLocalAddress(value);
    };

    const [localAddress, setLocalAddress] = useState("");

    const handleSelect = async (addressValue: string) => {
        setLocalAddress(addressValue);
        props.onSetAddress(addressValue);
    };
    return (
        <PlacesAutocomplete
            value={localAddress}
            onChange={onSetAddress}
            onSelect={handleSelect}
        >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
            }) => (
                <div style={{ maxHeight: "7rem", overflow: "auto" }}>
                    <input
                        {...getInputProps({
                            placeholder: "Type address...",
                        })}
                    />
                    <div>
                        {loading && <p>Loading...</p>}
                        {suggestions.map((suggestion) => {
                            const style = {
                                backgroundColor: suggestion.active
                                    ? "#41b6e6 "
                                    : "#fff",
                                padding: "0rem 1rem",
                                color: "black",
                                fontSize: "small",
                            };

                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default PlacesAutocompleteComponent;
