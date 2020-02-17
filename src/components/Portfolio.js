import React, { Component } from 'react'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {updatedValue: ''}
    }

    componentDidMount() {
        this.updateStockValue()
    }

    updateStockValue = async () => {
        const URL = `https://sandbox.iexapis.com/stable/stock/${this.props.symbol}/quote?token=${process.env.REACT_APP_API_KEY}`
        try {
            const fetchResponse = await fetch(URL); 
            const data = await fetchResponse.json(); 
            if(this.props.value < data.open) {
                this.setState({
                    updatedValue: 'text-danger'
                })
            } else if(this.props.value > data.open) {
                this.setState({
                    updatedValue: 'text-success'
                })
            } else {
                this.setState({
                    updatedValue: 'text-secondary'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="my-3">
                <span className={`border-bottom p-2 ${this.state.updatedValue}` }>
                    {this.props.symbol} - {this.props.shares} Shares ${this.props.value}
                </span>
            </div>
        )
    }
}

export default Portfolio