import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {

  const [currencyType, setCurrencyType] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let toAmount, fromAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyType([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`) 
      .then(response => response.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountFrom(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountFrom(false);
  }

  return (
    <div>
    <h1>Currency Converter</h1>
    <CurrencyRow 
      currencyType={currencyType}
      selectCurrency={fromCurrency}
      onChangeCurrency={e => setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}
    />
    <div className="equals">=</div>
    <CurrencyRow 
      currencyType={currencyType}
      selectCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toAmount}
    />
    </div>
  );
}
  

export default App;
