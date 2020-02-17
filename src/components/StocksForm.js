import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class StocksForm extends Component {
    constructor(props) {
        super(props)
        this.state = {ticker: '', qty: ''}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    fetchStocks = async () => {
        const URL = `https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/quote?token=${process.env.REACT_APP_API_KEY}`
        try {
            const fetchRequest = await fetch(URL)
            const stockData = await fetchRequest.json();
            if(stockData.symbol) this.buyStocks(stockData);

        } catch (error) {
            console.log(error)
            toast.error("Invalid Symbol", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }

    buyStocks = async (stockData) => {
        const URL = `${process.env.REACT_APP_URL}/users/${JSON.parse(localStorage.userData).id}/stocks`
        try {
            const fetchRequest = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify({stock: stockData, qty: this.state.qty}),
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            const data = await fetchRequest.json(); 
            if(data.error) {
                toast.error(data.error, {
                    position: toast.POSITION.TOP_LEFT
                });
            }

            this.setState({ticker: '', qty: ''});
            this.props.fetchUserStocks(); // Passed from parent, fetch the user's stock and update state to reflect newly bought stock

        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.fetchStocks();
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-4 ml-5">Cash - $ {this.props.balance}</h2>
                <form onSubmit={this.handleSubmit}>
                    
                    <div className="form-group my-4 ml-5 w-50">
                        <input name="ticker" type="text" className="form-control" placeholder="Ticker" value={this.state.ticker} onChange={this.handleChange} required/>
                    </div>
                    
                    <div className="form-group ml-5 w-50">
                        <input name="qty" type="number" className="form-control" placeholder="Qty" value={this.state.qty} onChange={this.handleChange} required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Buy</button> 
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default StocksForm