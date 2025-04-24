import '../pagesStyles/BarsStyle.css';
import logo from '../images/FDM_icon_noBg.png'

import Employee from '../components/Employee';
import Fab from '@mui/material/Fab'


const Nav=(props)=>{

    return(
    <div className='Nav'>
        <nav className='info'>
          <Fab onClick={props.onClick} color="#white">{props.initials}</Fab>
          <Employee name={props.name} email={props.email}/>
        </nav>
        <img src={logo} />
      </div>
    )
}

export default Nav;