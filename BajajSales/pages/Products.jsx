import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductCard, Container } from "../src/components";


export default function AllProduct() {
    const { slug } = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await fetch("https://bajaj-sales-backend.onrender.com/bajajsales/product-details", {
                    method: "GET",
                })
                const result = await response.json()
                const { data } = result
                setProduct(data)
            } catch (error) {
                throw new error
            }
        }
        getDetails()
    }, [slug])
    return (
        <div className='w-1/2 py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {product.map((product) => (
                        <div key={product._id} className='p-3 w-1/4'>
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}