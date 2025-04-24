import { useState , useEffect} from 'react';
import '../App.css';

import SideBar from '../components/SideBar';
import Nav from '../components/Nav';
import ClaimBtn from '../components/ClaimBtn';
import { wait } from '@testing-library/user-event/dist/utils';
import { useLocation } from 'react-router-dom';

import { claims } from '../data/claims';
import { userDetails } from '../data/userDetails';


function Claims(){
    const {state}=useLocation();
    const id=state.user;
    const emp=state.emp;

    const name=userDetails.filter(user=> user.id==id).map(user=> user.name);
    const initials=userDetails.filter(user=> user.id==id).map(user=> user.initials);
    const email=userDetails.filter(user=> user.id==id).map(user=> user.email);
    const clLis=claims.filter(claim=> claim.employee==emp);


    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);};
         
    return (
        <div className="Claims">
            <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
            <div className='bottom'> 
                <h5>{emp}'s Claims:</h5>
                <table className='table'>
                    <tr>
                    <td>CLAIM TYPE</td>
                    <td>CLAIM ID</td>
                    <td>AMOUNT</td>
                    <td>SUBMISSION DATE</td>
                    <td>STATUS</td>
                    </tr>
                </table>
                <div className="list">
                    <table>
                    {
                    clLis.map(claim => (
                        <ClaimBtn click={'/ProcessClaim'} state={claim.id} empId={emp}
                            one={claim.type}
                            two={claim.id}
                            three={claim.amount}
                            four={claim.submission}
                            five={claim.status}
                            />
                    ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Claims;