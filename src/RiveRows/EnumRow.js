import React, { useState } from "react";
import { useViewModelInstanceEnum } from "@rive-app/react-webgl2";

export default function EnumRow({ viewModelInstance, name }) {
    const { value: enumToDisplay, setValue: setEnumValue, values: enumOptions } = useViewModelInstanceEnum(name, viewModelInstance);

    const handleChange = (event) => {
        setEnumValue(event.target.value); 
    };

    return (
        <tr>
            <td>{name}</td>
            <td>Enum</td>
            <td>{enumToDisplay}</td>
            <td>
               <select value={enumToDisplay} onChange={handleChange}>
                {enumOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
                </select>
            </td>
        </tr>
    );
}