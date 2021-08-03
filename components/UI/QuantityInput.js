import React, { useState } from 'react';
import theme from '../../config/theme';

const QuantityInput = ({ disabled, onChange, allowNegatives, maxLength, max, min, defaultValue, error }) => {

  // Set the default Value
  let defValue;
  if (defaultValue){
    if (min && defaultValue < min) defValue = min;
    else defValue = defaultValue;
  }
  else if (min) defValue = min;
  else defValue = "";
  
  const [number, setNumber] = useState(defValue);

  // Set the minimum value
  min = min ? min : allowNegatives ? null : 0;
  const hasMin = min || min === 0;

  // Update Number state
  const updateNumber = val => {

    // Validate Number
    let num = "";
    if (val) {
      num = parseInt(val);
      if (isNaN(num) || ((hasMin) && num < min)) num = 0;
      else if (num > max) num = max;
    }
    setNumber(num);
    if (onChange) onChange(num);
  }

  // On Manual Change
  const handleOnChange = ({ target: { value } }) => updateNumber(value);

  const minReached = (hasMin) && number <= min;
  const maxReached = max && number >= max;

  // Decrement
  const decrement = () => {
    if (minReached || disabled) return;
    updateNumber(number - 1);
  }

  // Increment
  const increment = () => {
    if (maxReached || disabled) return;
    updateNumber(number + 1);
  }

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="QuantityInput">
      <div className="field">
        <div className="button" onClick={decrement}>-</div>
        <input type="text" value={number} maxLength={maxLength || "7"} onChange={handleOnChange} disabled={disabled} placeholder="0" />
        <div className="button" onClick={increment}>+</div>
      </div>

      {error && <h5> {error} </h5>}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .QuantityInput {
          display: inline-block;
        }
        .field {
          display: inline-flex;
          align-items: center;
        }

        input {
          width: 90px !important;
          margin: 0 10px;
          text-align: center;
        }

        .button {
          height: 30px;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-weight: bold;
          font-size: 1.2rem;
          cursor: pointer;
          color: ${theme.colors.lightText};
          transition: background linear 0.25s;
          background: ${theme.colors.highlightColor};
        }

        .button:hover {
          background: #000;
          color: #fff;
        }

        h5 {
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
};

export default QuantityInput;