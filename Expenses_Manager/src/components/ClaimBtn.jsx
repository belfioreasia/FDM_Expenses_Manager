import { Link } from 'react-router-dom';

import '../App.css';

const ClaimBtn=(props)=>{

    return(
            <div className='claimBtn'> 
                <Link to={props.click} state={{claimID:props.state, id:props.empId}}> <button> 
                    <p>{props.one}</p>
                    <p>{props.two}</p>
                    <p>{props.three}</p>
                    <p>{props.four}</p>
                    <p>{props.five}</p>
                </button> </Link>
            </div>
    )
}

export default ClaimBtn;