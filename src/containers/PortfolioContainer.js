import React, { Component } from 'react';
import Portfolio from '../components/Portfolio';
import StocksForm from '../components/StocksForm';

class PortfolioContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {stocks: [], total: 0, balance: 0};
    }

    fetchUserStocks = async () => {
        const id = JSON.parse(localStorage.userData).id;
        const URL = `${process.env.REACT_APP_URL}/users/${id}/stocks`;
        
        try {
            const fetchResponse = await fetch(URL);
            const data = await fetchResponse.json();
            let total;
            if(data.stocks.length > 0) {
                total = data.stocks // total of all stocks and their values to two decimal places
                .map((stock) =>  parseFloat(stock.value) * stock.shares)
                .reduce((total, val) => total + val).toFixed(2);   
            }
            this.setState({
                stocks: data.stocks,
                total: total,
                balance: data.balance
            });
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchUserStocks();
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row ml-5">
                    <div className="col">
                    <h2 className="my-4">Portfolio (${this.state.total})</h2>
                    {this.state.stocks.map((stock) => (
                        <Portfolio symbol={stock.symbol} shares={stock.shares} value={stock.value} key={stock.id}/>
                    ))}
                    </div>
                    <div className="col"><StocksForm balance={parseFloat(this.state.balance).toFixed(2)} fetchUserStocks={this.fetchUserStocks}/></div>
                </div>
            </div>
        )
    }
}

export default PortfolioContainer