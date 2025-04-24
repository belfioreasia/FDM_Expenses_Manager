import React from 'react';
import { useState} from 'react';
import { useNavigate , Link , useLocation} from 'react-router-dom';
import '../pagesStyles/reportClaim.css';

import SideBar from '../components/SideBar';
import Nav from '../components/Nav';

import { userDetails } from '../data/userDetails';
import { claims } from '../data/claims';
import { employees } from '../data/employees';


export default function ReportClaim (){
    const { state } = useLocation();
    const claimID = state.claimID;
     const data = state.id;
    //const data = '1';

    const name=userDetails.filter(user=> user.id==data).map(user=> user.name);
    const initials=userDetails.filter(user=> user.id==data).map(user=> user.initials);
    const email=userDetails.filter(user=> user.id==data).map(user=> user.email);

    const claimEmp=claims.filter(claim=> claim.id==claimID).map(claim=>claim.employee);

    const listClaims = claims.filter(claim => claim.id==claimID).map(claim =>
        <table>
            <tr>
                <td className="desc"><span>Type:</span></td>
                <td> {claim.type}</td>
            </tr>
            <tr>
            <td className="desc"><span>Amount:</span></td>
                <td> {claim.amount}</td>
            </tr>
            <tr>
                <td><span className="desc">Expense date:</span></td>
                    <td> {claim.expDate}</td>
            </tr>
            <tr>
                <td><span className="desc">Employee:</span></td>
                    <td> {claim.employee}</td>
            </tr>
            <tr>
                <td><span className="desc">Transportation:</span></td>
                    <td> {claim.id}</td>
            </tr>
        </table>);

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    }
    
    const navigate = useNavigate();
    const handleClick = event => {
        event.preventDefault(); 
        alert('Claim successfully reported.')
        const ind = claims.findIndex((claim => claim.id == claimID));
        claims[ind].status="REPORTED";
        navigate('/home', { state: { id: data } });
        };
      

    return(
        <div classNameName='ReportClaim'>
            <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
        <div className="main">
            <div className="card-element" >
                <div className="claimInfo">
                    <h2>Expense Details</h2>
                    <div className="claimDet">
                    {listClaims}
                    </div>
                </div>
                <div className="empInfo">
                    <h2>Employee Details</h2>
                    <div className="empDet">
                    <table>
                        <tr>
                            <td className='desc'><span>Name:</span></td>
                            <td >{employees.filter(employee => employee.name==claimEmp).map(employee =>employee.name)}</td>
                        </tr>
                        <tr>
                            <td className='desc'><span>Role:</span></td>
                            <td>{employees.filter(employee => employee.name==claimEmp).map(employee =>employee.role)}</td>
                        </tr>
                        <tr>
                            <td className='desc'><span>Email:</span></td>
                            <td>{employees.filter(employee => employee.name==claimEmp).map(employee =>employee.email)}</td>
                        </tr>
                        <tr>
                            <td className='desc'><span>Reliability Score:</span></td>
                            <td>{employees.filter(employee => employee.name==claimEmp).map(employee =>employee.score)}</td>
                        </tr>
                    </table>
                    </div>
                </div>
            </div>
            <div>
                <div className="btns">
                    <button onClick={handleClick}>REPORT FRAUD SUSPICION</button>
                    <button onClick={handleClick}>REPORT INCORRECT INFORMATION</button>   
                    <Link to="/home" state={{id:data}}><button> CANCEL </button></Link> 
                </div>
                <div className="expl">
                    <h2>Report Reason and Further Explanation: </h2>
                    <input type='text' className='justify' style={{fontSize:'20px'}}/>
                </div>
            </div>
        </div>
        </div>
    )
}