import { useState , useEffect} from 'react';
import '../pagesStyles/PagesStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import SideBar from '../components/SideBar';
import Nav from '../components/Nav';
import ClaimBtn from '../components/ClaimBtn';

import { employees } from '../data/employees';
import { userDetails } from '../data/userDetails';

function MyEmp(props){
    const { state } = useLocation();
    const  manager= state.lm;

    const name=userDetails.map(user=> user.name);
    const usId=userDetails.map(user=> user.id);
    const initials=userDetails.map(user=> user.initials);
    const email=userDetails.map(user=> user.email);
    
    const listEmps = employees.filter(employee => employee.lm==manager).map(employee =>
        <tr>
            <td style={{width: '70em'}}><ClaimBtn click="" one={employee.name} two={employee.id} three={employee.role} four={employee.score}/> </td>
            <td style={{width: '10em'}}><Link to="/claims" state={{user: usId, emp: employee.name}}><button  style={{width:'8em'}}className='button'> VIEW CLAIMS</button></Link> </td> 
        </tr>);

    const navigate = useNavigate();


    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);};
    return (
        <div className="Emps">
            <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
            <div className='bottom'> 
                <h5>My Employees:</h5>
                <table className='table'>
                    <tr>
                    <td> NAME</td>
                    <td> ID NUMBER</td>
                    <td>ROLE</td>
                    <td>SCORE</td>
                    <td>CLAIMS</td>
                    </tr>
                </table>
                <div className="list">
                    <table> {listEmps} </table>
                </div>
            </div>
        </div>
    )
}

export default MyEmp;