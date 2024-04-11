import React from "react";
import { Container, ProductCard } from "../src/components";
import { useLocation } from 'react-router-dom';
import Filter from "../src/components/Filters";

export default function SearchResult() {
    const location = useLocation();
    const { product } = location.state;
    return (
        <div className="flex">
            <div className=" px-2 py-2">
                <Filter/>
                </div>
            {!product && (
                <div className="w-1/2 py-8">
                    <div className="flex flex-wrap items-center justify-center">
                        <div>
                            <img src="/emptysb.png" style={{ height: "20rem" }}></img>
                        </div>
                    </div>
                    <div className="font-bold text-1/2xl">
                        <div className="flex justify-center w-full">
                                <p>No Products Found</p>
                        </div>
                    </div>
                </div>
            )}
            {product && (
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
        </div>
    )
}