import React, {Component} from 'react';

class CryptoList extends Component {

    render() {
        return (
           <ul>
               {this.props.rates.map(rate =>
                 <li key={rate.currency}>
                 Last rate: &nbsp;<span className={rate.class}>{rate.last}</span>&nbsp;
                 <strong>{rate.currency}&nbsp; [{rate.symbol}]</strong>
                </li>)}
           </ul>
              
        )
    }
}


export default CryptoList;