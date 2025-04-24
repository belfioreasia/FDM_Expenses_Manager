import React from 'react';
import { useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';

import '../pagesStyles/PagesStyles.css';

import SideBar from './SideBar';
import Nav from './Nav';

import { userDetails } from '../data/userDetails';

export default function ChangeInfo(){
    const name=userDetails.map(user=> user.name);
    const id=userDetails.map(user=> user.id);
    const initials=userDetails.map(user=> user.initials);
    const email=userDetails.map(user=> user.email);
    const oldPw=userDetails.map(user=> user.password);

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
  }

    const navigate = useNavigate();
    const [newPw, setNew] = useState('');
    const [confPw, setConf] = useState('');
    const handleClick = event => {
        event.preventDefault(); 
    
        if (newPw==oldPw ){
            alert('Your new password cannot be the same as the old password.');
        }
        else {
            if (newPw!=confPw || newPw=='' || confPw==''){
                alert('The given inputs do not match.');
            }
            else{
                // update password to new one
                const ind = userDetails.findIndex((user => user.id == id));
                userDetails[ind].password=newPw;
                alert('Password updated successfully.');
                navigate('/home', { state: { id: id } });
            }
        }
      };


    return (
        <div className='ChangeInfo'>
            <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
            <div className='middle'>
                <h3>CHANGE PASSWORD</h3>
                <table>
                    <tr>
                        <td><label>New Password:</label></td>
                        <td><input type='text' className='description' onChange={event => setNew(event.target.value)} value={newPw}
                        style={{fontSize:'20px', width: '13em'}}></input></td>
                    </tr>
                    <tr>
                        <td><label>Confirm Password:</label></td>
                        <td><input type='text' className='description' onChange={event => setConf(event.target.value)} value={confPw}
                        style={{fontSize:'20px', width: '13em'}}></input></td>
                    </tr>
                    
                </table>    
            </div>
            <nav className="nav">
                 <button onClick={handleClick}>CONFIRM</button> 
                 <Link to='/myDetails' state={{id: {id}}}><button> CANCEL </button> </Link>
            </nav>
        </div>

    )
}