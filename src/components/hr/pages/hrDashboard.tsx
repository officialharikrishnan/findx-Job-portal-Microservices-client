import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../sections/header'
import Profile from '../sections/profile'
import Jobs from '../sections/jobs'
import { useMediaQuery } from 'react-responsive'

const HrDashboard = () => {
    const isBigScreen = useMediaQuery({ query: '(min-width: 1224px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return (
      <div >
        <Header/>
        <div className=" flex flex-row justify-around">
        {isBigScreen && <div className="grid-cols-1 invisible lg:visible ">
          <Profile />
        </div>}
        <div className="grid-cols-11">
          <Jobs/>
        </div>
        </div>
      </div>
    );
}

export default HrDashboard