import React from 'react'
import {useDispatch} from 'react-redux'
import { logout } from '../../../store/authStore';
import store from '../../../store/store';

function LogoutBtn(){
    const {accessToken}=store.getState().auth.userData
    const {_id}=store.getState().auth.userData.user
    const dispatch = useDispatch()
    const logoutHandler= async ()=>{
       try {
        const response = await fetch('http://localhost:8000/bajajsales/logout',{
         method:"POST",
         headers:{
             "Content-Type":'application/json',
            },
         body:JSON.stringify({"_id":`${_id}`,"accessToken":`${accessToken}`})
        });
        if(response.ok){
            dispatch(logout())
        }
       } catch (error) {
       console.log("Error:",error)
       }
    }
    return(
        <button className='inline-block font-black text-red-700 px-4 mx-1 my-2 py-1 duration-200 hover:bg-red-700 hover:border-white hover:text-white border-2 border-red-700'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn