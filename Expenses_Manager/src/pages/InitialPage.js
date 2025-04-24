import React from 'react';
import { useNavigate , Link } from 'react-router-dom';

import logo from '../images/FDM_icon_noBg.png'
import '../pagesStyles/InitialPageStyle.css';
import Spline from '@splinetool/react-spline';




function InitialPage() {
  const navigate = useNavigate();
  function handleClick(event) {
    navigate('/target-route');
  }

    return (
    <div className="InitialPage">
        <div className='top'>
            <Link to={{pathname:"/login"}}> <button onClick={handleClick}>Login</button> </Link> 
            <img src={logo} />
        </div>
        <div className='bottom'>   
          <div className='left'>
          <Spline scene="https://prod.spline.design/QpLNNoN3zvhvuFAR/scene.splinecode" />
          </div> 
          <div className='right'>
            <h1 style={{alignSelf:'center'}}>CLAIM YOUR BUSINESS EXPENSES</h1>  
            <h3 style={{alignSelf:'center', width:'15em'}}>Free, Easy, Accessible</h3> 
          </div>            
        </div>
        <footer>
            <p>CONTACT US:</p>
            <p>
                <p>Telephone: 020 3056 8240</p>
                <p>Website: https://www.fdmgroup.com </p>
            </p>
        </footer>
    </div>
  );
}

export default InitialPage;
