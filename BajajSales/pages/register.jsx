import React from "react";
import { register as Register } from "../src/components/index.js";

export default function Registration() {
    return (
        <div className="py-8" style={{backgroundImage: `url('src/assets/registerbg.jpg')`,backgroundSize: 'cover',}}>
            <Register />
        </div>
    );
}
