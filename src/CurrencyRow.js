import React from 'react';

export default function CurrencyRow(props) {
    const {currencyType, selectCurrency, onChangeCurrency, amount, onChangeAmount} = props;
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyType.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    )
}