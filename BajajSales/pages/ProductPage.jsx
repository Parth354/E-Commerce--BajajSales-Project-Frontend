import React, { useEffect, useState } from "react";
import { Button, Input } from "../src/components";
import { addtoCart } from "../store/authStore";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ProductPage() {

    const url = window.location.href;
    const segments = url.split('/');
    const dispatch = useDispatch()
    const [product, setProduct] = useState()
    const [loading, setloading] = useState(true)
    const id = segments[segments.length - 1];
    useEffect(() => {
        getData();
    }, [segments])
    const getData = async () => {
        try {
            const response = await fetch(`${process.env.SERVER}/bajajsales/getProductbyId`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: `${id}` })
            })

            const result = await response.json()
            const { data } = result
            setProduct(data)
            setloading(false)
        } catch (error) {
            throw new error
        }
    }
    return !loading ? (
        <div className="flex py-2 px-2">
            <div>
                <img src={`${product.photos}`} style={{ height: "40px" }} />
            </div>
            <div className="px-2">
                <img src={`${product.photos}`} style={{ height: "400px" }} />
            </div>
            <div className="flex flex-wrap mt-2 ml-10">
                <div className="w-full">
                    <p className="font-bold text-2xl">{product.title}</p>
                    <div className="py-2 w-full font-bold flex">
                        <span >Price :</span>
                        <p>${product.price}</p>
                    </div>
                </div>
                <div className="w-full">
                    <span className="font-bold">Product Description :</span>
                    <p>{product.description}</p>
                </div>
                <div className="w-full">
                    <p>Quantity :</p>
                    <Input type="Number" divWidth="w-40"></Input>
                </div>
                <div className="w-full">
                    <Button className='mr-1' onClick={() => dispatch(addtoCart({ cartData:  product  }))}>Add To Cart</Button>
                    <Link to={"/cart"}><Button className='ml-1' onClick={() => { dispatch(addtoCart({ cartData:  product  })) }}>Buy</Button></Link>
                </div>
            </div>
        </div>
    ) : null
}