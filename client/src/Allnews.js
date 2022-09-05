import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
import NoSearch from "./NoSearch";
import axios from 'axios';
import NoHindiSearch from "./NoHindiSearch";


function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
  var currLang = props.viewLang;
  sessionStorage.setItem("currentTopic", props.topic)
  const getNews = async() => {
    try{
    const Data = await fetch(
      "http://127.0.0.1:8000/"
    ,{
      mode : 'cors'
    });
    console.log(sessionStorage.getItem("currentTopic"))
    const dataNews = await Data.json();
    setNewsData(dataNews)
  }catch(e){
    console.log(e);
  }
  }
  useEffect(async() => {
    await getNews();
  },[props.topic, currLang]);
  const totalData = props.topic=='top'?newsData:newsData.filter(element=>element.category===props.topic)
  const totalSearchData = totalData.filter(e=>e.heading.toLowerCase().includes(props.viewInput.toLowerCase()))
  const totalHindiSearchData = totalData.filter(e=>e.hheading.includes(props.viewInput))
console.log(props.viewInput)
return (<div className="container">
    {currLang=='en'?props.viewInput===''?totalData.map((ele)=>{
          return <News title={ele.heading}
          date={ele.newsDate}
          category={ele.category} topic = {props.topic} source={ele.source} content={ele.news} simplify = {ele.simplify} image={ele.imageUrl} additionalUrl={ele.newsUrl} getPageLang={currLang}
          />
    }):
    totalSearchData.length ? totalSearchData.map((ele)=>{
      return <News title={ele.heading} 
      date={ele.newsDate}
      category={ele.category} topic = {props.topic} source={ele.source} content={ele.news} simplify = {ele.simplify} image={ele.imageUrl} additionalUrl={ele.newsUrl} getPageLang={currLang}/>
    }):<NoSearch/>:
    props.viewInput===''?totalData.map((ele)=>{
      return <News title={ele.hheading} date={ele.hnewsDate} category={ele.category} getPageLang={currLang} additionalUrl={ele.additionalUrl} topic = {props.topic} source={ele.hsource} content={ele.hnews} simplify = {ele.hsimplified} image={ele.imageUrl} />
    }):totalHindiSearchData.length?totalHindiSearchData.map((ele)=>{
      return <News title={ele.hheading} date={ele.hnewsDate} category={ele.category} getPageLang={currLang} additionalUrl={ele.additionalUrl} topic = {props.topic} source={ele.hsource} content={ele.hnews} simplify = {ele.hsimplified} image={ele.imageUrl} />
    }):<NoHindiSearch/>
  }
  </div>
  );
}

export default Allnews;


// pub_92827e3c0b4e56d836a972b6004297158542
// pub_930227b420d2d7e030700ff57726ca453f8a