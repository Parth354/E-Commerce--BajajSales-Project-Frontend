import { useEffect} from 'react'
import './App.css'
import { Footer,Header } from './components'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>
     <div className='min-h-screen flex flex-wrap'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App
