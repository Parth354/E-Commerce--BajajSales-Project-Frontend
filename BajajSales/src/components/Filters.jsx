import React, { useState } from "react";
import Input from "./input";

export default function Filter() {
    const [value, setValue] = useState(50);
    const handleInputChange = (event) => {
        setValue(event.target.value);
    };
    const filter= (async(data)=>{
        console.log(data)
     try {
        const response= await fetch(`${process.env.SERVER}/bajajsales/filter?q=${data}`)
        if (!response.ok) {
            throw new Error('Failed to Apply Filters');
        }
     } catch (error) {
        
     }
    })

    return (
        <div className=" border-black border-2 px-2 rounded-xl">
            <div className="flex font-bold py-2">
                <p>Apply Filters:</p>
                <button onClick={filter} className="ml-2 border-2 px-1 font-thin rounded-lg">Apply</button>
            </div>
            <form onSubmit={filter}>
                <Input type='range' label={`Price Below: $${value}`} min="0" max="10000" value={value} divWidth="w-40"
                    onChange={handleInputChange}></Input>
                <div className="font-semibold py-2">
                </div>
            </form>
        </div>
    )
}