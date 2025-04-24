import React from 'react';
import { useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import '../pagesStyles/MyDetails.css';


import SideBar from '../components/SideBar';
import Nav from '../components/Nav';
import ClaimBtn from '../components/ClaimBtn';

import { userDetails, myEmps , myClaims} from '../data/userDetails';


function PersonalInfo (){
    const { state } = useLocation();
    // state.id;
    const  userId='1';
    const name=userDetails.filter(user=> user.id==userId).map(user=> user.name);
    const initials=userDetails.filter(user=> user.id==userId).map(user=> user.initials);
    const email=userDetails.filter(user=> user.id==userId).map(user=> user.email);
    const role=userDetails.filter(user=> user.id==userId).map(user=> user.role);

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    }

    const listInfo = userDetails.map(user =>
        <table>
            <tr>
                <td>Name:</td>
                <td className="description">{name}</td>
            </tr>
            <tr>
                <td>Role:</td>
                <td className="description">{userDetails.filter(user=> user.id==userId).map(user=> user.role)}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td className="description">{email}</td>
            </tr>
            <tr>
                <td>Reliability score:</td>
                <td className="description">{userDetails.filter(user=> user.id==userId).map(user=> user.score)}</td>
            </tr>
            <tr>
                <td>Currency:</td>
                <td className="description">{userDetails.filter(user=> user.id==userId).map(user=> user.currency)}</td>
            </tr>
            <tr>
                <td>Budget:</td>
                <td className="description"> {userDetails.filter(user=> user.id==userId).map(user=> user.spent)}</td>
            </tr>
            <tr>
                <td>Total Allowace:</td>
                <td className="description">{userDetails.filter(user=> user.id==userId).map(user=> user.allowance)}</td>
            </tr>
        </table>);

        var listClaims={};

        if(role!="Line Manager"){
        listClaims = myClaims.map(claim =>
            <tr>
                <td>{claim.type}</td>
                <td>{claim.amount}</td>
                <td>{claim.status}</td>
                <td><Link to="/expenseClaimInfo" state={{claimID: claim.id ,id:userId}}> <input className="button" type="button" value="INFO" />  </Link></td>
            </tr>);
        }
        else{ 
        listClaims = myEmps.map(emp =>
            <tr>
                <td>{emp.name}</td>
                <td><Link to="/empDetails" state={{id: userId,empId: emp.id}}> <input className="button" type="button" value="INFO" />  </Link></td>
            </tr>
            );
}
    
    const consChange=userDetails.filter(user=> user.role=="Consultant").map(user=> 
        <Link to={{pathname:"/ChangeInfo"}}><button> LOCATION / CURRENCY </button></Link>
    )
        

        return (
            <div className="PersonalInfo">
                <span>
                    <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
                </span>
                <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
                <header className="header">
                    <div className='left'>
                        <h4>Personal details:</h4>
                        {listInfo}
                    </div >
                    <div className='right' style={{marginBottom: '1em'}}>
                        <h4>Other info:</h4>
                        <table>
                            {listClaims}
                        </table>
                    </div>
                </header>
                <nav className="nav">
                    <Link to={{pathname:"/ChangePassword"}}><button> CHANGE PASSWORD </button></Link>
                    {consChange}
                </nav>
            </div>
        )
    }

export default PersonalInfo;