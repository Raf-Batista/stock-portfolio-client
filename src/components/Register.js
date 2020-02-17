import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 class Register extends Component {
     constructor(props) {
         super(props)
         this.state = {name: '', email: '', password: '', error: ''}
     }

     handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      
      createUser = async () => {
        const URL = `${process.env.REACT_APP_URL}/users`; 
        try {
            const fetchResponse = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify({user: this.state}),
                headers:{
                  'Content-Type': 'application/json'
                }
            });
            const data = await fetchResponse.json();
            if(data.token) {
                localStorage.setItem('userData', JSON.stringify(data));
                this.setState({name: '', email: '', password: ''})
                this.props.history.push('/portfolio');
            } else {
                this.setState({
                    error: data.errors.join(' ')
                });

                toast.error(this.state.error, {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        } catch(error) {
            console.log(error)
        }
      }

      handleSubmit = event => {
        event.preventDefault()
        this.createUser();
      }

    render() {
        return (
            <div className="container p-3 border border-dark mt-5" id="login">
                <h3 className="text-center">Register</h3>
                <form onSubmit={this.handleSubmit}>
                     <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="name" className="form-control"  name="name" onChange={this.handleChange} value = {this.state.name} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control"  name="email" onChange={this.handleChange} value={this.state.email} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password} required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                </form>
                <span>Already have an account? <a href="/login">Login</a> </span>
                <ToastContainer />
            </div>
        )
    }
}

export default Register
