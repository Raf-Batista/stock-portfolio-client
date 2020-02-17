import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {email: '', password: '', error: ''}
    }

    login = async () => {
        const URL = `${process.env.REACT_APP_URL}/login`; 
        try {
            const fetchResponse = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify({user: this.state}),
                headers:{
                  'Content-Type': 'application/json'
                }
            });
            const data = await fetchResponse.json();
            if(data.token) { // Returns a token if login is successful. Store the token and redirect to Portfolio
                localStorage.setItem('userData', JSON.stringify(data));
                this.setState({email: '', password: ''});
                this.props.history.push('/portfolio');
            } else { // If login unsuccessful, set error state with error message from server and use react-tostify to display a toast with error message
                toast.error(data.error, {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        } catch(error) {
            console.log(error)
        }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.login();
    }
    
    render() {
        return (
            <div className="container p-3 border border-dark mt-5" id="login">
                <h3 className="text-center">Login</h3>
                <form onSubmit={this.handleOnSubmit}>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email"  className="form-control" name="email" onChange={this.handleOnChange} value={this.state.email} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleOnChange} value={this.state.password} required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary mb-3 login-button" >Login</button>
                
                </form>
                <span>Don't have an account? <a href="/">Register</a> </span>
                <ToastContainer /> {/* react-toastify container */}
            </div>
        )
    }
}

export default Login