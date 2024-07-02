import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { api_key } from "../../data";
import { converter } from "../../data";
import moment from "moment"
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const {videoId}=useParams()
  const [apidata, setApidata] = useState(null);
  const[channeldata,setChannelData]=useState(null)
  const [commentdata, setCommentData] = useState(null);

  const fetchVideoData = async () => {
    //console.log("inside fetchh");
    const details = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api_key}`;
    const response = await fetch(details);
    const data = await response.json();
    setApidata(data.items[0]);
  };

  const fetchChannelData=async()=>{
    const details_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${api_key}`
    const response = await fetch(details_url);
    
    const data = await response.json();
    setChannelData(data.items[0]);

    //fetching comment data

    const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${api_key}`
    const responseC = await fetch(comment_url);
    const dataC = await responseC.json();
    setCommentData(dataC.items);

  }

  


  useEffect(() => {
    async function call() {
      //console.log("inside call");
      await fetchVideoData();
    }
    call();
  }, [videoId]);

  useEffect(()=>{
    async function call() {
      console.log("inside call");
      await fetchChannelData();
    }
    call();
  },[apidata])

  if (!apidata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="play-video">
      <iframe
        width="866"
        height="487"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Spain 4 - 1 Georgia | Highlights | UEFA Euro | 1st July 2024"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apidata.snippet.title}</h3>
      <div className="play-video-info">
        <p>{converter(apidata.statistics.viewCount)} views {apidata?moment(apidata.snippet.publishedAt).fromNow():"published"}</p>
        <div>
          <span>
            <img src={like} alt="" />
            {converter(apidata.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channeldata?channeldata.snippet.thumbnails.default.url:"image of channel"} alt="" />
        <div>
          <p>{apidata?apidata.snippet.channelTitle:"channel title"}</p>
          <span>{channeldata?converter(channeldata.statistics.subscriberCount):"sub"} subscribers</span>
        </div>
        <button>subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apidata.snippet.description.slice(0, 250)}</p>
        <hr />
        <h4>{converter(apidata.statistics.commentCount)} comments</h4>

        {commentdata?commentdata.map((item,index)=>{
            return(
              <div className="comments" key={index}>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>4 days ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
            )
        }):"comment data"}
        
      </div>
    </div>
  );
};

export default Playvideo;
