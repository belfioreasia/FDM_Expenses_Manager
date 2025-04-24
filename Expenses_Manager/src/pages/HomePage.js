import React from 'react';
import { useState} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import '../pagesStyles/PagesStyles.css';

import SideBar from '../components/SideBar';
import Nav from '../components/Nav';
import ClaimBtn from '../components/ClaimBtn';

import { myClaims , userDetails } from '../data/userDetails';
import { claims } from '../data/claims';


function HomePage(props) {
  const { state } = useLocation();
  const data = state.id;  

  const name=userDetails.filter(user=> user.id==data).map(user=> user.name);
  const initials=userDetails.filter(user=> user.id==data).map(user=> user.initials);
  const email=userDetails.filter(user=> user.id==data).map(user=> user.email);
  const role=userDetails.filter(user=> user.id==data).map(user=> user.role);
  const emp=userDetails.filter(user=> user.id==data).map(user=> user.name);
  
  var listClaims={};

  if(role!="Line Manager"){
    listClaims = myClaims.filter(claim=>claim.status=='PENDING').map(claim =>
      <ClaimBtn click="/expenseClaimInfo" state={claim.id} empId={data}
                one={claim.type} 
                two={claim.id} 
                three={claim.type} 
                four={claim.amount}
                five={claim.submission}/>);
  }
  else{ 
    listClaims = claims.filter(claim=>claim.status=='PENDING' && claim.lm==name).map(claim =>
      <ClaimBtn click="/ProcessClaim" state={claim.id} empId={data}
                one={claim.employee} 
                two={claim.id} 
                three={claim.type} 
                four={claim.amount}
                five={claim.submission}/>);
  }

  


  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  }

  const actions=userDetails.filter(user=> user.role=="Line Manager").map(user=> 
        <Link to="/myEmployees" state={{id:user.id}}> <button > My Employees </button> </Link>
    )
    

    return (
    <div className="HomePage">
      <span>
      <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      </span>
      <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
      <div className='bottom'>
          <div className='left'>
            <h5>Pending Claims:</h5>
              <table className='table'>
                <tr>
                  <td>NAME</td>
                  <td> ID</td>
                  <td> TYPE</td>
                  <td>AMOUNT</td>
                  <td>SUBMISSION</td>
                </tr>
              </table>
            <div className="claims">
                <table>
                  <tr><td>{listClaims}</td></tr>
                 </table>
            </div>
          </div>
          <nav className="actions">
            <Link to="/MakeClaim"> <button >Claim Expense</button> </Link>
            <Link to="/claims" state={{user: data, emp: emp}}> <button > Personal Claims </button> </Link>
            {actions}
          </nav>
      </div>
    </div>
  );
}

export default HomePage;
