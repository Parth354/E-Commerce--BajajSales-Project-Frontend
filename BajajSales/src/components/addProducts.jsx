import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Select, Button, Input } from './index';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addprod_info } from "../../store/authStore";


const addProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sellerData = useSelector((state) => state.sl_auth?.sellerData?.user)
  if(!sellerData){
   console.error("Please Login ");
   useEffect(()=>{
   navigate("/seller-login")
   },[!sellerData])
  }else{
  const {_id}=sellerData
  const { register, handleSubmit } = useForm({});
  const submit = (async (product_info) => {

    try {
      const formData = new FormData();
      Object.entries(product_info).forEach(([key, value]) => {
        if (key === 'photos') {
          // Append each file from the FileList to FormData
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else {
          formData.append(key, value);
        }
      });
     
        formData.append("_id", `${_id}`);
      const response = await fetch('http://localhost:8000/bajajsales/add-product', {
        method: "POST",
        body: formData
      });
      response.json()
        .then((result) => {
          const { data } = result
          dispatch(addprod_info({ productData: data }))
          navigate("/seller-dashboard")
        })
    }

    catch (error) {
      throw new error
    }

  })
  const categories = [
    "Electronics",
    "Clothing & Accessories",
    "Home & Kitchen",
    "Books & Media",
    "Health & Beauty",
    "Toys & Games",
    "Sports & Outdoors",
    "Automotive",
    "Pet Supplies",
    "Jewelry & Watches",
    "Office & School Supplies",
    "Grocery & Gourmet Foods",
    "Furniture",
    "Tools & Home Improvement",
    "Baby & Kids",
    "Travel & Luggage"
  ];
  return (
    <div className="w-full flex h-screen">
      <div className="px-20 py-10w w-full">
        <p className="mb-5 font-black text-xl">Add New Product On Bajaj Sales </p>
        <div>
          <form onSubmit={handleSubmit(submit)} className="flex flex-wrap w-full">
            <Input
              label="1. Product Title :"
              placeholder="Title"
              divWidth="w-1/3"
              className="px-2 mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="2. Product Price :"
              placeholder="Price in $"
              divWidth="w-1/3"
              className="px-2 mb-4"
              {...register("price", { required: true })}
            />
            <Select
              options={categories}
              label="3. Category :"
              divWidth="w-1/3"
              className="mb-4"
              {...register("category", { required: true })}
            />
            <Input
              label="4. Product Description :"
              placeholder="Add A Description"
              className="px-2 mb-4"
              {...register("description", { required: true })}
            />
            <Input
              label="Product Images :"
              type="file"
              divWidth="w-1/3"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("photos", { required: true })}
            />
            <Button type="submit" className="ml-10 mt-7 h-10" >Add Product</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
}
export default addProduct