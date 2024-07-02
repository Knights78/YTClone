import React, { useState } from 'react'
import SideBar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import './Home.css'
const Home = ({sidebar}) => {
  const[category,setCategory]=useState(0)
  return (
    <>
      <SideBar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container ${sidebar?"":"large-container"}`}>
        <Feed category={category}/>
      </div>
    </>
  )
}

export default Home