import React, { useState } from "react";
import { useViewModelInstanceColor } from "@rive-app/react-webgl2";

export default function ColourRow({ viewModelInstance, name }) {
    const { value: colour, setRgba: setColour } = useViewModelInstanceColor(name, viewModelInstance);

    const handleChange = (event) => {
        setInputValue(event.target.value);
        const r = parseInt(hexColor.substring(1,3), 16);
        const g = parseInt(hexColor.substring(3,5), 16);
        const b = parseInt(hexColor.substring(5,7), 16);
        setColour(r,g,b,255);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>Colour</td>
            <td style={{backgroundColor: `#${colour.toString(16)}`}}></td>
            <td>
                <input
                    type="color"
                    onChange={handleChange}
                />
            </td>
        </tr>
    );
}