import React, { useEffect, useState } from "react";
import "./Allnews.css";
import './Policies.css';
import policiesData from "./PoliciesData";
import News from "./News";
import NoSearch from "./NoSearch";
import NoHindiSearch from "./NoHindiSearch";
function Policies(props) {
  String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
  }
    const [newsData, setNewsData] = useState([]);
    const simplifyIt = ()=>{}
    var seeLang = props.getpolicyLang
    const totalPolicySearchData = policiesData.filter(e=>e.Headline.toLowerCase().includes(props.getpolicyWords.toLowerCase()))
    const totalPolicyData = policiesData.filter(e=>e.hindiHeading.includes(props.getpolicyWords))
    console.log(totalPolicySearchData)
  return (
  <div className="policyContainer">
  <div className="policiesContainer">
    {seeLang=='en'?
    props.getpolicyWords===''?
    policiesData.map((ele)=>{
      return <News title={ele.Headline} 
      // date={ele.Date.Time}
      category={ele.Domain} 
      // source={ele.Source}
       additionalUrl={ele.newsUrl} content={ele.Summarized_News} simplify={ele.simplified} image={ele.Image_Url} getPageLang={seeLang}/>
    })
    :totalPolicySearchData.length?totalPolicySearchData.map((ele)=>{
      return <News title={ele.Headline} 
      // date={ele.Date.Time}
      category={ele.Domain} 
      // source={ele.Source} 
      additionalUrl={ele.newsUrl} content={ele.Summarized_News} simplify={ele.simplified} image={ele.Image_Url} getPageLang={seeLang}/>
    }):<NoSearch/>:
    props.getpolicyWords===''?
    // policiesData.map((ele)=>{
      policiesData.map((ele)=>{
        return <News title={ele.hindiHeading} 
        // date={ele.hindiDate}
        category={ele.Domain} topic="topic" 
        // source={ele.hindiSource}
         additionalUrl={ele.newsUrl} content={ele.hindiSumarize} simplify={ele.hindiSimplify} image={ele.Image_Url} getPageLang={seeLang}/>
      }):totalPolicyData.length?totalPolicyData.map((ele)=>{
        return <News title={ele.hindiHeading} 
        // date={ele.hindiDate}
        category={ele.Domain} topic="topic" 
        // source={ele.hindiSource}
        additionalUrl={ele.newsUrl} content={ele.hindiSumarize} simplify={ele.hindiSimplify} image={ele.Image_Url} getPageLang={seeLang}/>
      }):<NoHindiSearch/>}
      </div>
    </div>
  );
}

export default Policies