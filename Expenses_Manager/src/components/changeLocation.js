import React from 'react';
import { useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';

import '../pagesStyles/PagesStyles.css';

import SideBar from './SideBar';
import Nav from './Nav';

import { userDetails } from '../data/userDetails';

export default function ChangeLocation(){
    const name=userDetails.map(user=> user.name);
    const id=userDetails.map(user=> user.id);
    const initials=userDetails.map(user=> user.initials);
    const email=userDetails.map(user=> user.email);

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
  }

    const navigate = useNavigate();
    const [newLoc, setLoc] = useState('');
    const [newCurr, setCurr] = useState('');

    const handleClick = event => {
        event.preventDefault(); 
        const ind = userDetails.findIndex((user => user.id == id));
        userDetails[ind].location=newLoc;
        userDetails[ind].currency=newCurr;
        alert('Information updated successfully.');
        navigate('/home', { state: { id: id } });
        }
      


    return (
        <div className='ChangeInfo'>
            <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
            <div className='middle'>
                <h3>CHANGE LOCATION</h3>
                <table>
                    <tr>
                        <td><label>Available Locations:</label></td>
                        <td>
                            <form onChange={event => setLoc(event.target.value)} value={newLoc}>
                                <select className='description' defaultValue="United Kingdom" 
                                    style={{width:'2em', fontSize:'3em'}}>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="US">US</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="Chins">China</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="North America">North America</option>
                                    </select>
                            </form>
                        </td>
                    </tr>
                    <tr>
                    <td><label>Available Currencies:</label></td>
                        <td>
                        <form onChange={event => setCurr(event.target.value)} value={newCurr}>
                            <select className='description' defaultValue="£ - GBP" 
                                    style={{width:'1em', fontSize:'3em'}}>
                                        <option value="£ - GBP">£ - GBP</option>
                                        <option value="$ - USD">$ - USD</option>
                                        <option value="€ - EUR">€ - EUR</option>
                                        <option value="Other">Other</option>
                                    </select>
                            </form>
                        </td>
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