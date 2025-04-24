import { useNavigate } from "react-router-dom";
import logo from '../images/indietro.png'
import '../pagesStyles/BarsStyle.css';

const BackBtn=(props)=>{
    const navigate = useNavigate();
    function handleClick(event) {
        event.preventDefault(); 
        navigate(-1);
    }
    return(
        <button className="indietro" onClick={handleClick}> <img 
        style={{width: '23px', padding:'0px', margin:'0px'}}
        src={logo} alt="indietro"/> </button>
    )
}

export default BackBtn;