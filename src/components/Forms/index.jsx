import React, { useState, useEffect } from "react";
import "./form.css";
import JSConfetti from "js-confetti";

const SimpleForm = () => {
  let [birthDate, setBirthDate] = useState("");
  let [error, setError] = useState("");
  let [nameError, setNameError] = useState("");
  let [lastnameError, setLastnameError] = useState("");
  let [postalCodeError, setPostalCodeError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [cityError, setCityError] = useState("");
  let [isFormValid, setIsFormValid] = useState(false);

 useEffect(() => {
    setIsFormValid(
      birthDate &&
      !error &&
      !nameError &&
      !lastnameError &&
      !emailError &&
      !postalCodeError &&
      !cityError
    );
  }, [birthDate, error, nameError, lastnameError, emailError, postalCodeError, cityError]);

  const validateCity = async (event) => {
    const cityName = event.target.value.trim();

    if (cityName.length < 2) {
      setCityError("Veuillez entrer une ville valide.");
      return;
    }

    try {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${cityName}&fields=nom&limit=1`
      );
      const data = await response.json();

      if (data.length === 0) {
        setCityError("Cette ville n'existe pas en France.");
      } else {
        setCityError("");
      }
    } catch (error) {
      setCityError("Erreur de validation de la ville.");
    }
  };

  // Expression régulière pour valider le code postal (5 chiffres uniquement)
  const postalCodeRegex = /^\d{5}$/;

  // Calcule la date limite pour les 18 ans
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setBirthDate(selectedDate);

    if (selectedDate > minDate) {
      setError("Vous devez avoir au moins 18 ans.");
     } else {
      setError("");
     }
    ;
  };

  // Expression régulière pour valider les noms et prénoms
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
  // Expression régulière pour valider les emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateLastname = (event) => {
    const value = event.target.value;
    if (!nameRegex.test(value)) {
      setLastnameError(
        "Le nom ne doit contenir que des lettres, accents ou tirets."
      );
    } else {
      setLastnameError("");
    }
  
  };

  const validateFirstname = (event) => {
    const value = event.target.value;
    if (!nameRegex.test(value)) {
      setNameError(
        "Le prénom ne doit contenir que des lettres, accents ou tirets."
      );
    } else {
      setNameError("");
    }
    ;
  };

  const validatePostalCode = (event) => {
    const value = event.target.value;
    if (!postalCodeRegex.test(value)) {
      setPostalCodeError("Le code postal doit être composé de 5 chiffres.");
    } else {
      setPostalCodeError("");
    }
    ;
  };

  const validateEmail = (event) => {
    const value = event.target.value;
    if (!emailRegex.test(value)) {
      setEmailError("Veuillez entrer une adresse email valide.");
    } else {
      setEmailError("");
    }
    ;
  };

  const confetti = new JSConfetti();

  function showConfetti() {
    confetti.addConfetti();
  }

  return (
    <div>
      <form data-testid="form" className="form">
        <div className="formGroup">
          <label htmlFor="Lastname" className="label">
            Enter your Last name:{" "}
          </label>
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
          <label htmlFor="name" className="label">
            Enter your First name:{" "}
          </label>
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
          <label htmlFor="email" className="label">
            Enter your email:{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="input"
            onChange={validateEmail}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="formGroup">
          <label htmlFor="date" className="label">
            Enter your date of birth:{" "}
          </label>
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
          <label htmlFor="city" className="label">
            Enter your City:{" "}
          </label>
          <input
            type="text"
            name="city"
            id="city"
            required
            className="input"
            onBlur={validateCity}
          />
          {cityError && <p className="error">{cityError}</p>}
        </div>

        <div className="formGroup">
          <label htmlFor="postalCode" className="label">
            Enter your postal code:{" "}
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            required
            className="input"
            onChange={validatePostalCode}
          />
          {postalCodeError && <p className="error">{postalCodeError}</p>}
        </div>

        <div className="formGroup">
          <input
            type="submit"
            value="Save"
            className={`button ${!isFormValid ? "disabled" : ""}`}
            onClick={showConfetti}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
