import React from 'react'
import Playvideo from '../../components/Playvideo/Playvideo'
import './Video.css'
import Recommended from '../../components/Recommended/Recommended'
import { useParams } from 'react-router-dom'
const Video = () => {
  const {videoId,categoryId}=useParams();
  return (
    <div className='play-container'>
      <Playvideo videoId={videoId} />
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video