import React, { useState } from "react";
import Input from "./input";
import Button from "./button";
import {  useNavigate } from "react-router-dom";

export default function Filter() {
    const [value, setValue] = useState(50);
    const navigate= useNavigate()
    const [selectedOption, setSelectedOption] = useState('')
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value);
    };
    const filter = (async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/bajajsales/filter?q=${value}&sort=${selectedOption}`,{
                method: "GET",
            })
            const result = await response.json()
            const{ data } = result
            navigate('/searchResults',{ state: { product: data } })
            if (!response.ok) {
                throw new Error('Failed to Apply Filters');
            }
        } catch (error) {
          console.log(error)
        }
    })

    return (
        <div className=" px-4 bg-yellow-500 rounded py-2">
            <div className="flex font-bold py-2">
                <p>Apply Filters:</p>
            </div>
            <form onSubmit={filter}>
                <Input type='range' label={`Price Below: $${value}`} min="0" max="10000" value={value} divWidth="w-40"
                    onChange={handleInputChange}></Input>
            </form>
            <p className="font-medium px-2 pt-1">Sort by Price:</p>
            <label className="block px-2 py-1">
                <input
                    type="radio"
                    value="ascending"
                    checked={selectedOption === 'ascending'}
                    onChange={handleRadioChange}
                />
                Lowest to Highest
            </label>
            <label className="block px-2 py-1">
                <input
                    type="radio"
                    value="descending"
                    checked={selectedOption === 'descending'}
                    onChange={handleRadioChange}
                />
                Highest to Lowest
            </label>
            <Button onClick={filter} className="ml-10 m-2">Apply</Button>
        </div>
    )
}