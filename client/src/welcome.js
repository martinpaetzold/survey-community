import React from "react";
import Registration from "./registration.js";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to my social network</h1>
            <div>
                <Registration />
            </div>
        </div>
    );
}