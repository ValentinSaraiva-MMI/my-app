  import React, { useState } from 'react';
  import './form.css';

  const SimpleForm = () => {
  let [count, setCount] = useState(0);
  let [birthDate, setBirthDate] = useState("");
  let [error, setError] = useState("");
  let [nameError, setNameError] = useState("");
  let [lastnameError, setLastnameError] = useState("");
  // let [blockbtn, setBlockbtn] = useState(true);


  // Calcule la date limite pour les 18 ans
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0];

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setBirthDate(selectedDate);

    if (selectedDate > minDate) {
      setError("Vous devez avoir au moins 18 ans.");
      // setBlockbtn(true);
    } else {
      setError("");
      // setBlockbtn(false);
    }
  };

  // Expression régulière pour valider les noms et prénoms
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;

   const validateLastname = (event) => {
    const value = event.target.value;
    if (!nameRegex.test(value)) {
      setLastnameError("Le nom ne doit contenir que des lettres, accents ou tirets.");
    } else {
      setLastnameError("");
    }
  };

  const validateFirstname = (event) => {
    const value = event.target.value;
    if (!nameRegex.test(value)) {
      setNameError("Le prénom ne doit contenir que des lettres, accents ou tirets.");
    } else {
      setNameError("");
    }
  };

    return (
      <div>
        <form data-testid="form" className="form">
          <div className="formGroup">
          <label htmlFor="Lastname" className="label">Enter your Last name: </label>
          <input 
            type="text" 
            name="Lastname" 
            id="Lastname" 
            required 
            className="input"
            onChange={validateLastname}
          />
          {lastnameError && <p className="error">{lastnameError}</p>}
        </div>
        <div className="formGroup">
          <label htmlFor="name" className="label">Enter your First name: </label>
          <input 
            type="text" 
            name="Firstname" 
            id="name" 
            required 
            className="input"
            onChange={validateFirstname}
          />
          {nameError && <p className="error">{nameError}</p>}
          </div>
          <div className="formGroup">
            <label htmlFor="email" className="label">Enter your email: </label>
            <input type="email" name="email" id="email" required className="input" />
          </div>
          <div className="formGroup">
            <label htmlFor="date" className="label">Enter your date of birth: </label>
           <input 
            type="date" 
            name="date" 
            id="date" 
            required 
            className="input"
            value={birthDate}
            onChange={handleDateChange}
          />
           {error && <p className="error">{error}</p>}
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
            <input type="submit" value="Save" className="button"  />
          </div>
        </form>
      </div>
    );
  };

  export default SimpleForm;
