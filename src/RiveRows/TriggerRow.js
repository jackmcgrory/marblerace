import React, { useState } from "react";
import { useViewModelInstanceTrigger } from "@rive-app/react-webgl2";

export default function TriggerRow({ viewModelInstance, name }) {
    const { trigger: useTrigger } = useViewModelInstanceTrigger(name, viewModelInstance);

    return (
        <tr>
            <td>{name}</td>
            <td>Trigger</td>
            <td>N/A</td>
            <td>
            <button onClick={useTrigger}>
                   Use Trigger
                </button>
            </td>
        </tr>
    );
}