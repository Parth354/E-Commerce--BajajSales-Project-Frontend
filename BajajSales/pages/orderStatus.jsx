import React, { useState } from "react";
import { Button, Input } from "../src/components";
import { useForm } from "react-hook-form";

export default function OrderStatus() {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [error, setError] = useState()

    const submit = async (_id) => {
        try {
            const response = await fetch('http://localhost:8000/bajajsales/order-status', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(_id)
            });

            if (!response.ok) {
                setError(`${response.statusText}`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full z-0 h-screen flex items-center justify-center " style={{ backgroundImage: `url('src/assets/registerbg.jpg')`, backgroundSize: 'cover' }}>
                <div className="z-10 mx-auto w-full max-w-lg bg-black text-white rounded-xl p-10 border border-black/10 bg-opacity-45" >
                    <div className="flex w-full justify-center">
                        <p className="font-black text-2xl pb-2">Order Status(Under Develop)</p>
                    </div>
                    <form onSubmit={handleSubmit(submit)} className=' overflow-y-auto'>
                        <Input
                            label="Order Id :"
                            type="text"
                            placeholder="Enter your Order Id"
                            {...register("_id")}
                            errors={errors}
                        />

                        <Button className="w-full my-2" type="submit">Get Status</Button>

                    </form>
                    <div className="flex w-full justify-center">
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}