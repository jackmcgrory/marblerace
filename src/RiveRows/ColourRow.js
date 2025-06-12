import React, { useEffect, useState } from "react";
import { useViewModelInstanceColor } from "@rive-app/react-webgl2";

export default function ColourRow({ viewModelInstance, name }) {

    /**
     * Rive treats colours as RGBA ints but html deals with RGB for pickers with the results being given in hex codes
     * hence the colour channels have to be extracted
     */
    const { value: colour, setRgba: setColour } = useViewModelInstanceColor(name, viewModelInstance);

    const [inputColour, setInputColour] = useState("FFFFFF");
    const [alpha, setAlpha] = useState(255);

    const handleChange = (event) => {
        const hexColor = event.target.value;
        setInputColour(hexColor);

        const r = parseInt(hexColor.substring(1,3), 16);
        const g = parseInt(hexColor.substring(3,5), 16);
        const b = parseInt(hexColor.substring(5,7), 16);
        setColour(r,g,b,alpha);
    };

    const handleAlphaChange = (event) => {
        const newAlpha = parseInt(event.target.value);
        setAlpha(newAlpha);

        const r = parseInt(inputColour.substring(1,3), 16);
        const g = parseInt(inputColour.substring(3,5), 16);
        const b = parseInt(inputColour.substring(5,7), 16);

        setColour(r,g,b,newAlpha);
    }
    return (
        <tr>
            <td>{name}</td>
            <td>Colour</td>
            <td style={{backgroundColor: inputColour, opacity: alpha/255}}></td>
            <td>
                <input
                    type="color"
                    value={inputColour}
                    onChange={handleChange}
                />
                <input type="range" min="0" max="255" value={alpha} onChange={handleAlphaChange}/>
                <span>{alpha}</span>
            </td>
        </tr>
    );
}