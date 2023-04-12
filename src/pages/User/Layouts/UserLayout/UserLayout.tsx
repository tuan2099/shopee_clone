import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Component/UserSideNav'

function UserLayout() {
  return (
    <>
      <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
        <div className='container'>
          <div className='ggap-6 grid grid-cols-1 md:grid-cols-12'>
            <div className='md:col-span-3 lg:col-span-2'>
              <UserSideNav />
            </div>
            <div className='md:col-span-9 lg:col-span-10'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserLayout
