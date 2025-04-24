import React from 'react';
import { useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import '../pagesStyles/expenseStyles.css';

import SideBar from '../components/SideBar';
import Nav from '../components/Nav';
import BackBtn from '../components/BackBtn';

import { userDetails } from '../data/userDetails';
import { claims } from '../data/claims';

import mealOne from'../images/mealOne.jpg'
import  purchaseOne from'../images/purchaseOne.png'
import  receipt from'../images/receipt.png'
import  travelThree from'../images/travelThree.jpeg'



export default function ExpensesClaims(){
    const { state } = useLocation();
    const claimID = state.claimID;
    const data = state.id;

    const name=userDetails.filter(user=> user.id==data).map(user=> user.name);
    const initials=userDetails.filter(user=> user.id==data).map(user=> user.initials);
    const email=userDetails.filter(user=> user.id==data).map(user=> user.email);
    var pf=claims.filter(claim=> claim.id==claimID).map(claim=> claim.proof)

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);}

      const cType=claims.filter(claim=> claim.id==claimID).map(claim=> claim.type)
      var imgWrap={}
  
      if (cType=='Meal'){
        imgWrap={mealOne}}
      else{
        if (cType=='Purchase'){
          imgWrap={purchaseOne}}
        else{
          if (cType=='Overnight Stay'){imgWrap={receipt}}
          else{imgWrap={travelThree}}
        }
      }
    
    return(
        <div className="PurchaseExpense">
             <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} name={name} initials={ initials} email={email}/>
            <div className='middle'>
              <div className='left'>
                <h1>Claim Details:</h1>
                <table>
                  <tr>
                    <td>Type:</td>
                    <td className="description" > {claims.filter(claim=> claim.id==claimID).map(claim=> claim.type)}</td>
                  </tr>
                  <tr>
                    <td>Id:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.id)}</td>
                  </tr>
                  <tr>
                    <td>Amount:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.amount)}</td>
                  </tr>
                  <tr>
                    <td>Submission:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.submission)}</td>
                  </tr>
                  <tr>
                    <td>Expense Date:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.expDate)}</td>
                  </tr>
                  <tr>
                    <td>Employee:</td>
                    <td className="description" >{claims.filter(claim=> claim.id==claimID).map(claim=> claim.employee)}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.status)}</td>
                  </tr>
                  <tr>
                    <td>Currency:</td>
                    <td className="description">{userDetails.map(user=> user.currency)}</td>
                  </tr>
                  <tr>
                    <td>Motive:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.motive)}</td>
                  </tr>
                  <tr>
                    <td>Extra Details:</td>
                    <td className="description">{claims.filter(claim=> claim.id==claimID).map(claim=> claim.extra)}</td>
                  </tr>
                </table>
                <BackBtn/>
              </div>
              <div className='right'>
                <h1>Expense Proof:</h1>
                <div className='exProof'>
                  <img src={imgWrap}/>
                  <table>
                    <tr className='vat'>
                      <td>VAT:</td>
                      <td className="description" >{claims.filter(claim=> claim.id==claimID).map(claim=> claim.VAT)}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
        </div>
    )
}