import { useState , useEffect} from 'react';
import { useNavigate , Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import '../pagesStyles/makeClaim.css';

import SideBar from '../components/SideBar';
import Nav from '../components/Nav';

import { userDetails, myClaims, pushElement } from '../data/userDetails';

function MakeClaim(){
    const name=userDetails.map(user=> user.name)
    const initials=userDetails.map(user=> user.initials)
    const email=userDetails.map(user=> user.email)
    const id=userDetails.map(user=> user.id)

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);}

    var newClaim={
        id: '',
        type: '',
        amount: '',
        currency: '',
        submission: new Date().toISOString().slice(0, 10),
        expDate: '',
        status: '',
        employee: '',
        motive: '',
        VAT: '',
        extra: '',
        proof: '',
    };
    const [type, setType] = useState('');
    const [amount, setAmt] = useState('');
    const [expDate, setExp] = useState('');
    const [currency, setCurr] = useState('');
    const [motive, setMot] = useState('');
    const [extra, setExtra] = useState('');
    const [VAT, setVAT] = useState('');

    const randId=id+'73'+initials;


    // for proof image
    const [proofImage, setProofImage] = useState('');

    const navigate = useNavigate();
    // requires react-hook-form for form validation
    const handleClick = event => {
        event.preventDefault(); 
        if(amount=='' || expDate=='' || motive=='' || proofImage=='' ){
            alert("Please Insert all the information.")
        }else {
            newClaim={
                id: randId,
                type: type,
                amount: amount,
                currency: currency,
                submission: new Date().toISOString().slice(0, 10),
                expDate: expDate,
                status: 'PENDING',
                employee: name,
                motive: motive,
                VAT: VAT,
                extra: extra,
                proof: 'N/A',
            };

            pushElement(newClaim);
            alert('Claim submitted successfully.');
            navigate('/home', { state: { id: id } });
        }
    }


    return (
        <div className='MakeClaim'>
            <span>
                <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            </span>
            <Nav onClick={handleViewSidebar} initials={initials} name={name} email={email}/>
            <div className='middle'>
                <div className='left'>
                    <h1>Claim Form:</h1>
                    <form id="claimform" action='/expenseClaimInfo'>
                        <table>
                            <tr>
                                <td><label>Type:</label></td>
                                <td>
                                    <select required className='description' defaultValue="Travel" onChange={event => setType(event.target.value)} value={type}>
                                            <option value='Travel'>Travel Claim</option>
                                            <option value='Overnight Stay'>Overnight Stay Claim</option>
                                            <option value='Meal'>Meal Claim</option>
                                            <option value='Purchase'>Purchase Claim</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Amount:</label></td>
                                <td>
                                    <input required id='amount' className='description' type='text' onChange={event => setAmt(event.target.value)} value={amount}></input>
                                </td>
                                
                            </tr>
                            <tr>
                                <td><label>Expense Date:</label></td>
                                <td>
                                    <input required className='description' type='text' onChange={event => setExp(event.target.value)} value={expDate}></input>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Currency:</label></td>
                                <td>
                                <select className='description' defaultValue="£ - GBP" onChange={event => setCurr(event.target.value)} value={currency}>
                                        <option value='£ - GBP'>£ - GBP</option>
                                        <option value='$ - USD'>$ - USD</option>
                                        <option value='€ - EUR'>€ - EUR</option>
                                        <option value='Other'>Other</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Motive:</label></td>
                                <td>
                                    <input required className='description' type='text' onChange={event => setMot(event.target.value)} value={motive}></input>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Extra Details:</label></td>
                                <td><input className='description' type='text' onChange={event => setExtra(event.target.value)} value={extra}></input></td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div className='right'>
                    <h1>Expense Proof:</h1>
                    <div className='exProof'>
                    <img src={proofImage} alt='Proof image'></img>
                        <form>
                            {/* Image uploader element */}
                            <input required
                                type='file'
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    console.log(file);
                                    const imageUrl = URL.createObjectURL(file);
                                    setProofImage(imageUrl);
                                }}
                            >
                            </input>
                            <table>
                                <tr className='vat'>
                                    <td>VAT:</td>
                                    <td><input className='description' type='text' onChange={event => setVAT(event.target.value)} value={VAT}></input></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <nav className="nav">
              <Link><button type='submit' onClick={handleClick}> SUBMIT </button></Link>
              <Link to="/home" state={{id:id}}><button formAction='' > CANCEL </button></Link>
            </nav>
        </div>
    )
}

export default MakeClaim;