import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { useViewModelInstanceTrigger } from "@rive-app/react-webgl2";

export default function TriggerRow({ viewModelInstance, name }) {
    const [confettiActive, setConfettiActive] = useState(false);
    const confettiRef = useRef(confettiActive); 

    const { trigger: useTrigger } = useViewModelInstanceTrigger(name, viewModelInstance, {
        onTrigger: () => {
            if (confettiRef.current) {
                confetti({
                    particleCount: 300,
                    spread: 100,
                    origin: { y: 0.6 },
                });
            }
        }
    });

    const toggleConfetti = () => {
        setConfettiActive((prev) => {
            const newState = !prev;
            confettiRef.current = newState;
            return newState;
        });
    };

    return (
        <tr>
            <td>{name}</td>
            <td>Trigger</td>
            <td>
                <button onClick={toggleConfetti}>
                    {confettiActive ? "Disable Confetti" : "Confetti on Trigger?"}
                </button>
            </td>
            <td>
                <button onClick={() => useTrigger()}>Use Trigger</button>
            </td>
        </tr>
    );
}