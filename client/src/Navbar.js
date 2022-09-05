import "./Navbar.css";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useLocation } from "react-router-dom";
function Navbar(props) {
  const SpeechRecognition = window.SpeechRecognition||window.webkitSpeechRecognition
  const mic = new SpeechRecognition()
  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = props.getSearchLang=='en'?'en-US':'hi-IN';
  const [visible ,setVisible] = useState(false)
  const [listening ,setListening] = useState(false)
  const [note ,setNotes] = useState('')
  const {pathname} = useLocation()
    const handleChange = ()=>{
      visible?setVisible(false):setVisible(true)
    }
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const handleClickToOpen = () => {
      setOpen(true);
    };
    const handleToClose = () => {
      setOpen(false);
    };
  const handleOpen=()=>{
    mic.start()
  }
  mic.onresult=(e)=>{
    const trans = e.results[0][0].transcript;
    console.log(trans);
    setNotes(trans);
    setInputText(trans);
    document.getElementById('searchIt').value = trans
    mic.onerror = e => {
      console.log(e.error);
    }
    mic.stop()
  }
  console.log("Note"+note)
  console.log("trans"+inputText)
  useEffect(()=>{
    props.searchWords(inputText);
  })
  const handleVoiceSearch=()=>{
    props.searchWords(inputText);
  } 
  const handleNote= ()=>{
    mic.stop()
      props.searchWords(inputText);
  }
  const handleSearch = (e) => {
    setInputText(e.target.value);
    handleVoiceSearch();
  }
  let search = pathname=='/policies'?"Search Policies...":"Search News..."
  let hindiSearch = pathname=='/policies'?"नीतियां खोजें...":'समाचार खोजें...'
  return (
    <div className="Nav">
      <div className="menu" onClick={(e)=>{handleChange();
      props.visible(visible)
    }}><MenuIcon/></div>
      <div className="icon"></div>
      <div className="search">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
          alt="Search"
        />
    <input type="text" id="searchIt" placeholder={props.getSearchLang=='en'?search:hindiSearch} onChange={handleSearch} />
         {listening?

         <KeyboardVoiceIcon sx={{ fontSize: "20px" }}
              // onClick={()=>{handleOpen();
              //   setListening(true)}} 
              onClick={()=>{handleNote();
                setListening(false);}} 
              style={{ color: 'red' , cursor:'pointer'}}
              >    
      </KeyboardVoiceIcon>:<KeyboardVoiceIcon sx={{ fontSize: "20px" }}
              onClick={()=>{handleOpen();
                setListening(true)}} 
                style={{cursor:'pointer'}}
              >    
      </KeyboardVoiceIcon>}
       {open?<div>
        <button onClick={()=>{handleOpen();setListening(true)}}>Start Recording</button>
        <button onClick={()=>{handleNote();
          setListening(false);}} >Stop Recording</button>
          <button onClick={()=>{handleVoiceSearch();}}>Search</button>
      </div>:''}
      </div>
    </div>
  );
    }
export default Navbar;
