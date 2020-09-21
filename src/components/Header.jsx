import React,{useState} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff'
import {Link,NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaUserAstronaut,FaCartArrowDown} from 'react-icons/fa'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import {withRouter} from 'react-router-dom'
import {LogoutFunc, SearchInput} from './../redux/Actions'
import Swal from 'sweetalert2'
import {Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import { ImSearch } from "react-icons/im";
import { API_URL } from '../helpers/idrformat';
import Searchreducers from '../redux/reducers/Searchreducers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  warna:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));
const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 5,
    color:'white',
    fontSize:11,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    
    padding: '0 0px',
  },
}))(Badge);
function ButtonAppBar({username,isLogin,role,cart,searchInput, LogoutFunc,history,SearchInput}) {
  const classes = useStyles();
  const [anchorEl,setopen]=useState(null)
  const [search,searchChange]=useState('')
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
      

const onLogoutClick = ()=>{
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "yakin mau Log out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'iya Log out!',
      cancelButtonText: 'ga jadi, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        LogoutFunc()
        localStorage.clear()
        history.push('/')
        
      }
    })
    
    
}


const onChangePasswordClick = ()=> {
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: 'password lama',
      text: 'silahkan masukkan password lama'
    },
    'masukkan password baru',
    'confirmasi password baru'
  ]).then((result) => {
    if (result.value) {
      const answers = JSON.stringify(result.value)
      Swal.fire({
        title: 'All done!',
        // html: `
        //   Your answers:
        //   <pre><code>${answers}</code></pre>
        // `,
        confirmButtonText: 'selesai dan sukses!'
      })
    }
  })
}

const handleSearchInput=(e)=>{
  searchChange(e.target.value)
}

const handleSearchClick = () => {
  SearchInput(search)

}

// const renderDropdownCart=()=>{
//   return {
//     cart.product.gambar,
//     cart.product.namatrip,

//   }
// }


console.log(searchInput)
console.log('search',search)
console.log('cart',cart)
  return (
    <div className={classes.root}>
      <AppBar className={classes.warna} position='static'>
        <Toolbar>
            <NavLink to='/'  style={{textDecoration:'none',color:'white'}}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <FlightTakeoff/>
                </IconButton>
            </NavLink> 
          <Typography variant="h6" className={classes.title}>
            JoinTrip
          </Typography>
          <Typography style={{display:'flex', alignItems:'center'}} variant="h6" className={classes.title}>
            <Input style={{width: '400px'}} value={search} onChange={handleSearchInput}  type="text" name="search" placeholder="Search" />
            
              <ImSearch onClick={handleSearchClick}/>
           
          </Typography>

          
          {
            role==='admin'?
            <Link to='/manageAdmin' style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">Admin</Button>
            </Link>
            :
            role==='user'?
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                  <StyledBadge badgeContent={cart.length} color='secondary' >
                      <FaCartArrowDown/>
                  </StyledBadge>
              </DropdownToggle>
              <DropdownMenu>
                
                <DropdownItem>{cart.length}</DropdownItem>               
                  <DropdownItem divider />
                <Link to='/cart' style={{ textDecoration:'none',color:'white'}}>
                  <DropdownItem>Go to Cart</DropdownItem>
                </Link>

              </DropdownMenu>
            </Dropdown>
            // <Link to='/cart' style={{ textDecoration:'none',color:'white'}}>
              // <Button color="inherit">
              //   <StyledBadge badgeContent={cart.length} color='secondary' >
              //     <span style={{fontSize:20}}>
              //       <FaCartArrowDown />
              //     </span>
              //   </StyledBadge>
              // </Button>
            // </Link>
            :
            null
          }
          {
            isLogin?
            <>

              <Button color="inherit" onClick={(e)=>setopen(e.currentTarget)}><FaUserAstronaut/>&nbsp;{username}</Button>
              <Menu
                // id="simple-menu"
                anchorEl={anchorEl}
                // keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>setopen(null)}
                // onClose={handleClose}
              >
                <MenuItem >Profile</MenuItem>
                <MenuItem onClick={onChangePasswordClick}>change Password</MenuItem>
                <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
            :
            <>
            <Link to='/register' style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">Register</Button>
            </Link>
            <Link to='/login' style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">Log In</Button>
            </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const MapstatetoProps=({Auth,Search})=>{
  return {
    ...Auth,
    ...Search
  }
}


export default withRouter(connect(MapstatetoProps,{LogoutFunc,SearchInput})(ButtonAppBar));