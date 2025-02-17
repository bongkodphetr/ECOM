
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h1 className='text-3xl py-4'>Main nav</h1>
      <hr />
      <Outlet/>
    </div>
  )
}

export default Layout
