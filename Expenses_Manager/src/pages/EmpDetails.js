import React from 'react';
import { useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import '../pagesStyles/MyDetails.css';


import SideBar from '../components/SideBar';
import Nav from '../components/Nav';
import BackBtn from '../components/BackBtn';
import { userDetails, myEmps , myClaims} from '../data/userDetails';
import { employees } from '../data/employees';
import { claims } from '../data/claims';


function EmpDetails (){
    const { state } = useLocation();
    const  userId=state.id;
    const  empId=state.empId;
    const employee=employees
    const name=userDetails.filter(user=> user.id==userId).map(user=> user.name);
    const initials=userDetails.filter(user=> user.id==userId).map(user=> user.initials);
    const email=userDetails.filter(user=> user.id==userId).map(user=> user.email);
    const role=userDetails.filter(user=> user.id==userId).map(user=> user.role);

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    }

    const listInfo = employees.filter(employee=> employee.id==empId).map(employee =>
        <table>
            <tr>
                <td>Name:</td>
                <td className="description">{employee.name}</td>
            </tr>
            <tr>
                <td>Role:</td>
                <td className="description">{employee.role}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td className="description">{employee.email}</td>
            </tr>
            <tr>
                <td>Reliability score:</td>
                <td className="description">{employee.score}</td>
            </tr>
            <tr>
                <td>Budget:</td>
                <td className="description"> {employee.spent}</td>
            </tr>
            <tr>
                <td>Total Allowace:</td>
                <td className="description">{employee.allowance}</td>
            </tr>
        </table>);

            const listClaims = claims.filter(claim=>claim.empId==empId).map(claim =>
                <tr>
                    <td>{claim.type}</td>
                    <td>{claim.amount}</td>
                    <td>{claim.status}</td>
                    <td><Link to="/expenseClaimInfo" state={{claimID: claim.id ,id:userId}}> <input className="button" type="button" value="INFO" />  </Link></td>
                </tr>);

    
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
                        <div style={{backgroundColor:'white', borderRadius:'60px', marginLeft:'2em', width:'2.5em', padding:'1em'}}><BackBtn/></div>
                    </div >
                    <div className='right' style={{marginBottom: '1em'}}>
                        <h4>Other info:</h4>
                        <table style={{width:'60vw'}}>
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

export default EmpDetails;