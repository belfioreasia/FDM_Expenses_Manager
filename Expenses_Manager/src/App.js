import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Claims from './pages/Claims';
import MyEmp from './pages/MyEmployees';
import Login from './pages/Login';
import InitialPage from './pages/InitialPage'
import PersonalInfo from './pages/PersonalInfo';
import ExpensesClaims from './pages/ExpensesClaims';
import MakeClaim from './pages/MakeClaim';
import ProcessClaims from './pages/ProcessClaim';
import ChangePassword from './components/ChangeInfo';
import ChangeLocation from './components/changeLocation';
import ReportClaim from './pages/ReportClaim';
import EmpDetails from './pages/EmpDetails';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<InitialPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/myEmployees" element={<MyEmp />} />
        <Route path="/myDetails" element={<PersonalInfo />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/ChangeInfo" element={<ChangeLocation />} />
        <Route path="/ProcessClaim" element={<ProcessClaims />} />
        <Route path="/ReportClaim" element={<ReportClaim />} />
        <Route path="/expenseClaimInfo" element={<ExpensesClaims />} />
        <Route path="/makeClaim" element={<MakeClaim />} />
        <Route path="/empDetails" element={<EmpDetails />} />
      </Routes>
    </div>
  );
}