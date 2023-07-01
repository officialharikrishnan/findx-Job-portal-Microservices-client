import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HrLogin from './components/hr/pages/hrLogin'
import HrRegister from './components/hr/pages/hrRegister'
import HrProfileComplete from './components/hr/pages/hrProfileComplete'
import HrOtp from './components/hr/pages/otp'
import HrDashboard from './components/hr/pages/hrDashboard'
import UpdatePassword from './components/hr/pages/updatePassword'

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
        </Routes>
    </div>
  )
}

export default HrRoutes