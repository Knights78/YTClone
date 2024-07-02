import React, { useState, useEffect } from "react";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { api_key } from "../../data";
import { converter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    const related_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${api_key}`;
    const response = await fetch(related_url);

    const data = await response.json();
    setData(data.items);
  };

  useEffect(() => {
    async function call() {
      //console.log("inside call");
      await fetchdata();
    }
    call();
  }, [categoryId]);
  return (
    <div className="recommend">
      {data.map((item,index) => {
        return (
          <Link  to={`/video/${item.snippet.categoryId}/${item.id}`}className="side-video" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>done with Thi</h4>
              <p>Wass up man</p>
              <p>{converter(item.statistics.viewCount)}views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
