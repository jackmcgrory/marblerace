import React, { useState } from "react";
import { useViewModelInstanceString } from "@rive-app/react-webgl2";

export default function StringRow({ viewModelInstance, name }) {
    const { value: stringToDisplay, setValue: setStringValue } = useViewModelInstanceString(name, viewModelInstance);
    const [inputValue, setInputValue] = useState(stringToDisplay ? stringToDisplay : ""); // Track user input

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update state as user types
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
           setStringValue(inputValue);
        }
    };

    return (
        <tr>
            <td>{name}</td>
            <td>String</td>
            <td>{stringToDisplay}</td>
            <td>
                <input
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </td>
        </tr>
    );
}