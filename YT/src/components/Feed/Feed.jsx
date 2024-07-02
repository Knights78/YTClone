import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import {api_key} from "../../data";
import { converter } from "../../data";
import moment from "moment"

const Feed = ({category}) => {
    const[data,setData]=useState([])

    const fetchList = async () => {
        const video_list = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=64&regionCode=US&videoCategoryId=${category}&key=${api_key}`
        const response = await fetch(video_list)
        const data = await response.json()
        setData(data.items)
        console.log(data)
      }

    useEffect(()=>{
        fetchList()
    },[category])
  return (
    <div className="feed">
        {data.map((item,index)=>{
            return(
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className="card">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{converter(item.statistics.viewCount)} Views {moment(item.snippet.publishedAt).fromNow()}</p>
              </Link>
            )
        })}
     
     
      
    </div>
  );
};

export default Feed;
