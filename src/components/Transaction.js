import React, { Component } from 'react'

class Transaction extends Component {
    render() {
        return (
            <div className="mb-3">
                <span className="border-bottom p-2">BUY ({this.props.transaction.symbol}) - {this.props.transaction.shares} Shares @ {this.props.transaction.value} On: {this.props.transaction.date}</span> 
            </div>
        )
    }
}

export default Transaction