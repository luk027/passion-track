import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
      <Header/>
      <main className='min-h-screen container'>
        <Outlet />  
      </main>
   </div>
  )
}

export default AppLayout