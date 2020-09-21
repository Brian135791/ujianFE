import React,{ Component } from 'react';
import ButtonUI from './../../components/button'
import Axios from 'axios'
import {API_URL} from '../../helpers/idrformat'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import {RegFunc,LoginThunk} from './../../redux/Actions'
import {withRouter} from 'react-router-dom'
import Header from './../../components/Header'

class Register extends Component {
    state = { 
        username:'',
        password:'',
        passwordcheck:''
     }

    onChangeInput=(e,property)=>{
        this.setState({[property]:e.target.value})
        console.log(this.state.username)
    }

    onRegisterClick= ()=> {
        var obj = {
            username: this.state.username,
            password : this.state.password,
            role : 'user'
        }
        console.log('bug', this.state.passwordcheck + " " + this.state.password) 
        if(this.state.passwordcheck=== this.state.password){
            Axios.get(`${API_URL}/users?username=${this.state.username}`)
            .then((res)=>{
                if(res.data.length){
                    console.log(res.data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Maaf',
                        text: 'Username yang sama sudah ada,silahkan ganti nama lain',
                      })
                }else {
                    Axios.post(`${API_URL}/users`,obj)
                    .then(()=>{
                        this.props.LoginThunk(this.state.username, this.state.password)
                        this.props.history.push('/')
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            Swal.fire({
                icon: 'Password tidak sama',
                title: 'Oops...',
                text: 'cek password anda'
              })
        }

    }


    render() { 
        return ( 
            <>
            <Header/>
                <div className='d-flex justify-content-center align-items-center' style={{height:'80vh'}}>
                    <div className='py-4 px-3' style={{width:'30%',border:'1px solid black',display:'flex',flexDirection:'column'}}> 
                        <h2 style={{alignSelf:'center'}}>Register</h2>
                        <input onChange={(e)=>this.onChangeInput(e,'username')} className='form-control mt-2' type="text" placeholder='username'/>
                        <input onChange={(e)=>this.onChangeInput(e,'password')} className='form-control mt-2' type="password" placeholder='password'/>
                        <input onChange={(e)=>this.onChangeInput(e,'passwordcheck')} className='form-control mt-2' type="password" placeholder='masukin ulang password'/>
                    
                        {/* <button className='btn btn-primary mt-2' onClick={this.onLoginClick} style={{alignSelf:"flex-end"}}>Register</button> */}
                        <ButtonUI className='mt-3' onClick={this.onRegisterClick}> Register </ButtonUI>
                    </div>
                </div>

            </>
    
         );
    }
}


 
export default withRouter(connect(null,{RegFunc,LoginThunk}) (Register));