import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HrLogin from './components/hr/pages/hrLogin'
import HrRegister from './components/hr/pages/hrRegister'
import HrProfileComplete from './components/hr/pages/hrProfileComplete'
import HrOtp from './components/hr/pages/otp'
import HrDashboard from './components/hr/pages/hrDashboard'

const HrRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/hr-login' element={<HrLogin/>}/>
            <Route path='/hr-register' element={<HrRegister/>}/>
            <Route path='/hr-details' element={<HrProfileComplete/>}/>
            <Route path='/hr-verify' element={<HrOtp/>}/>
            <Route path='/hr-dashboard' element={<HrDashboard/>}/>
        </Routes>
    </div>
  )
}

export default HrRoutes