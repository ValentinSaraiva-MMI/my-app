import React, { useState } from 'react';
import './form.css';

const SimpleForm = () => {
  let [count, setCount] = useState(0);
  const clickOnMe = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button data-testid="countbutton" onClick={clickOnMe}>Click me</button>
      <span data-testid="count">{count}</span>

    


      <form data-testid="form" className="form">
        <div className="formGroup">
          <label htmlFor="Lastname" className="label">Enter your Last name: </label>
          <input type="text" name="Lastname" id="Lastname" required className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="name" className="label">Enter your First name: </label>
          <input type="text" name="Firstname" id="name" required className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="email" className="label">Enter your email: </label>
          <input type="email" name="email" id="email" required className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="date" className="label">Enter your date of birth: </label>
          <input type="date" name="date" id="date" required className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="city" className="label">Enter your City: </label>
          <input type="city" name="city" id="city" required className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="postalCode" className="label">Enter your postal code: </label>
          <input type="city" name="postalCode" id="postalCode" required className="input" />
        </div>
        <div className="formGroup">
          <input type="submit" value="Save" className="button" />
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
