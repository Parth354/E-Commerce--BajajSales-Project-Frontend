import { useEffect} from 'react'
import { Footer,Seller_Header } from '../src/components'
import { Outlet } from 'react-router-dom'
function SellerDashBoard() {
  useEffect(()=>{
  })
  return (
    <>
     <div className='min-h-screen flex flex-wrap'>
      <div className='w-full block'>
        <Seller_Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default SellerDashBoard
