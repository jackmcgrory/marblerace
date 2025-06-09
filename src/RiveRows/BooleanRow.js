import React from "react";
import { useViewModelInstanceBoolean } from "@rive-app/react-webgl2";

export default function BooleanRow({ viewModelInstance, name }) {
    const { value: isActive, setValue: setIsActive } = useViewModelInstanceBoolean(name, viewModelInstance);

    const handleToggle = () => {
        setIsActive(!isActive); // Toggle the boolean value
    };

    return (
        <tr>
            <td>{name}</td>
            <td>Boolean</td>
            <td className={isActive ? "green" : "red"}>{isActive ? "True" : "False"}</td>
            <td>
                <button onClick={handleToggle} className="toggle-button">
                    {isActive ? "Turn Off" : "Turn On"}
                </button>
            </td>
        </tr>
    );
}