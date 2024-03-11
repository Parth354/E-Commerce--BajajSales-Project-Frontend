import React from "react";
import AllProduct from "./Products";
import Filter from "../src/components/Filters";
import { HomeSlide } from "../src/components";

export default function Home() {
    return (
        <div className="py-8" >
                <div className="w-full">
                    <HomeSlide />
                </div>
            <div className="flex my-2">
                <div className=" px-2 py-2">
                <Filter/>
                </div>
                <div className="py-2">
                <div className="flex  flex-wrap justify-center">
                <div className="font-bold">
                 <p className="text-xl"> ALL PRODUCTS</p>
                </div>
            </div>
                    <AllProduct />
                </div>
            </div>
        </div>
    );
}