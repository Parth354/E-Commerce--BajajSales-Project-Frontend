import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Button from './button'
import { useDispatch } from 'react-redux'
import { addtoCart } from '../../store/authStore'

function ProductCard({_id, title, photos ,price}) {
    const dispatch=useDispatch()
  return (
    <div className=' border-black border-2 transition duration-300 ease-in-out hover:scale-105 rounded-xl p-3 bg-opacity-14' style={{width:"15rem"}}>
          <Link to={`/product/${_id}`}>
            <div className='w-full flex justify-center mb-4'>
                <img src={photos} alt={title}
                className='rounded-xl w-48 h-48 object-cover' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
            <h2
            className='text-xl font-bold'
            >${price}</h2>
        </Link>
        <Button className='mr-1' onClick ={()=>dispatch(addtoCart({cartData:{_id,title ,photos,price}}))}>Add To Cart</Button>
        <Link to={"/cart"}><Button className='ml-1' onClick ={()=>{dispatch(addtoCart({cartData:{_id,title ,photos,price}})); }}>Buy</Button></Link>
        </div>
  )
}


export default ProductCard