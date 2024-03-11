import React from "react";
import {Login as LoginComp} from "../src/components/index.js";

export default function Login() {
    return (
        <div className="py-8" style={{backgroundImage: `url('/registerbg.jpg')`,backgroundSize: 'cover',}}>
            <LoginComp />
        </div>
    );
}
