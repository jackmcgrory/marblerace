import React from "react";

export default function UnsupportedRow({ name, type }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{type}</td>
            <td>This type is currently not supported on this tool</td>
            <td></td>
        </tr>
    );
}