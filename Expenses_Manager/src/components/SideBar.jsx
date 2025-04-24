import React from "react";
import '../pagesStyles/BarsStyle.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { userDetails } from "../data/userDetails";
import BackBtn from "./BackBtn"


const SideBar = (props) => {
  const id="1";
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
  const name=userDetails.filter(user=> user.id==id).map(user=>user.name);

  const navigate=useNavigate();
  function handleClick(event, pathname){
    navigate('/home', { state: { id: id } });
  };

  const empList=userDetails.filter(user=> user.role=="Line Manager").map(user=> 
      <Link to="/myEmployees" state={{id: id, lm: name}}> <button style={{width: "190px"}}> My Employees </button> </Link>)

  return (
    <div className={sidebarClass}>
      <nav className="sideCont">
       <button onClick={handleClick} style={{width: "190px"}}> Homepage </button> 
      <Link to='/myDetails' state={{id: {id}}}> <button style={{width: "190px"}}> My Information </button> </Link>
      <Link to={{pathname:'/MakeClaim'}}> <button style={{width: "190px"}}> Claim Expense </button> </Link>
      <Link to="/claims" state={{user: id, emp: name}}> <button style={{width: "190px"}}> Personal Claims </button> </Link>
      {empList}
      <Link to="/login"> <button style={{width: "190px"}}> LOGOUT </button> </Link>

       <BackBtn/>
      </nav>
    </div>
  );
};

export default SideBar;