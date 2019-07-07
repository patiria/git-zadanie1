import React, { Component } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';

class CryptoRate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      currentRates: []
      
    }
  }
   
  componentDidMount() {
    this.getData();

    setInterval(() => {
       if (this.state.inputValue === '') {
        this.getData();
       }
    }, 5000);
  }

  getData = () => {
    axios.get('https://blockchain.info/pl/ticker')
      .then(response => {
        let data = response.data;
        const oldData = this.state.currentRates;
        let currentRates = [];

        Object.keys(data).forEach(currency => {
          let newCurrency = {
            currency: currency,
            last: data[currency].last,
            symbol: data[currency].symbol,
            class: 'blue'
          };


          const oldCurrency = oldData.find(cur => cur.currency === newCurrency.currency);
          //skrocona wersja zamiast if else

          if (oldCurrency !== undefined) {
            if (newCurrency.last > oldCurrency.last) {
              newCurrency.class = 'green';
            } else if (newCurrency.last < oldCurrency.last) {
              newCurrency.class = 'red'
                   
            }
          }

          currentRates.push(newCurrency);
        })
        console.log(currentRates);
      this.setState({ currentRates: currentRates });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  
onFilter = (event) => {
  let value = event.target.value;

  if (value.length === 0) {
    this.getData();
  }

  value = value.trim().toUpperCase();

  let currentRates = this.state.currentRates;
  currentRates = currentRates.filter(rate => {
    return rate.currency.includes(value);
  });

  this.setState({ inputValue: value, currentRates });
}

  render() {

    return (
      <div className="crypto">
        <h1>Crypto rate</h1>
        <input type="text" value={this.state.inputValue} onChange={this.onFilter} />
        <CryptoList rates={this.state.currentRates} />
      </div>
    )
  }
}


export default CryptoRate;