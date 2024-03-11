import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../src/components";
import Filter from "../src/components/Filters";

export default function Category() {
    const { item } = useParams();
    const [productList, setProductList] = useState([]);

    const fetchCategorywiseProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/bajajsales/search?q=${item}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Search results');
            }
            const { data } = await response.json();
            setProductList(data);
        } catch (error) {
            console.error('Error fetching categorywise products:', error);
        }
    };

    useEffect(() => {
        fetchCategorywiseProducts();
    }, [item]);

    return (
        <div style={{ minWidth: "23rem" }}>
            {productList.length == 0 ?
                (
                    <div className="py-2 justify-center items-center w-full flex flex-wrap">
                        <div className="flex justify-center w-full">
                            <div>
                                <img src="/src/assets/emptysb.png" style={{ height: "20rem" }}></img>
                            </div>
                        </div>
                        <div className="font-bold text-1/2xl">
                            <div className="flex justify-center w-full">
                                <div>
                                    <p>Try Something Else</p>
                                </div>
                            </div>
                            <div>
                                <p>No Products in the {item} Category</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex">
                        <div className="px-5" style={{marginTop:"5rem"}}>
                            <Filter />
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full px-5 py-5 font-bold text-xl">
                                <p>Let's Explore {item} Category </p>
                            </div>

                            <div className='flex flex-wrap'>
                                {productList.map((product) => (
                                    <div key={product._id} className='p-3 w-1/4'>
                                        <ProductCard {...product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

        </div>

    );
}
