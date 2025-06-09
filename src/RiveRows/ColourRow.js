import React, { useState } from "react";
import { useViewModelInstanceNumber } from "@rive-app/react-webgl2";

export default function ColourRow({ viewModelInstance, name }) {
    const { value: numberToDisplay, setValue: setNumberValue } = useViewModelInstanceNumber(name, viewModelInstance);
    const [inputValue, setInputValue] = useState(numberToDisplay ? numberToDisplay : 0); // Track user input

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update state as user types
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const userNumber = parseFloat(inputValue); // Convert input to number
            if (!isNaN(userNumber)) {
                setNumberValue(userNumber); // Update view model
            }
        }
    };

    return (
        <tr>
            <td>{name}</td>
            <td>Colour</td>
            <td>{numberToDisplay}</td>
            <td>
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="number-input"
                />
            </td>
        </tr>
    );
}