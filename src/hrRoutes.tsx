import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HrLogin from './components/hr/pages/hrLogin'
import HrRegister from './components/hr/pages/hrRegister'
import HrProfileComplete from './components/hr/pages/hrProfileComplete'
import HrOtp from './components/hr/pages/otp'
import HrDashboard from './components/hr/pages/hrDashboard'
import UpdatePassword from './components/hr/pages/updatePassword'
import ViewProfile from './components/hr/pages/viewProfile'
import UpdateProfile from './components/hr/pages/updateProfile'
import CreatePost from './components/hr/sections/createPost'

const HrRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<HrLogin/>}/>
            <Route path='/register' element={<HrRegister/>}/>
            <Route path='/forgot' element={<UpdatePassword/>}/>
            <Route path='/details' element={<HrProfileComplete/>}/>
            <Route path='/verify' element={<HrOtp/>}/>
            <Route path='/dashboard' element={<HrDashboard/>}/>
            <Route path='/view-profile' element={<ViewProfile/>}/>
            <Route path='/update-profile' element={<UpdateProfile/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
        </Routes>
    </div>
  )
}

export default HrRoutes