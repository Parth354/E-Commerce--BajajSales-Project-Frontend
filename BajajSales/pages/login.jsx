import React from "react";
import {Login as LoginComp} from "../src/components/index.js";

export default function Login() {
    return (
        <div className="py-8" style={{backgroundImage: `url('src/assets/registerbg.jpg')`,backgroundSize: 'cover',}}>
            <LoginComp />
        </div>
    );
}
