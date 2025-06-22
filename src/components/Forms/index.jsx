import React, { useState, useEffect } from "react";
import "./form.css";
import JSConfetti from "js-confetti";
import Toaster from "../Toaster";

const SimpleForm = () => {
  let [birthDate, setBirthDate] = useState("");
  let [error, setError] = useState("");
  let [nameError, setNameError] = useState("");
  let [lastnameError, setLastnameError] = useState("");
  let [postalCodeError, setPostalCodeError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [cityError, setCityError] = useState("");
  let [isFormValid, setIsFormValid] = useState(false);
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    visible: false,
  });

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
  }, [
    birthDate,
    error,
    nameError,
    lastnameError,
    emailError,
    postalCodeError,
    cityError,
  ]);

  const [users, setUsers] = useState([]);
  const [nbrUser, setNbrUser] = useState(0);

  useEffect(() => {
    // Récupérer la liste des utilisateurs
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.utilisateur) {
          setUsers(data.utilisateur);
          setNbrUser(data.utilisateur.length);
        }
      });
  }, []);

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
  };

  const validatePostalCode = (event) => {
    const value = event.target.value;
    if (!postalCodeRegex.test(value)) {
      setPostalCodeError("Le code postal doit être composé de 5 chiffres.");
    } else {
      setPostalCodeError("");
    }
  };

  const validateEmail = (event) => {
    const value = event.target.value;
    if (!emailRegex.test(value)) {
      setEmailError("Veuillez entrer une adresse email valide.");
    } else {
      setEmailError("");
    }
  };

  const confetti = new JSConfetti();

  function showConfetti() {
    confetti.addConfetti();
  }

  const showToaster = (message, type) => {
    setToaster({ message, type, visible: true });
    setTimeout(() => setToaster({ ...toaster, visible: false }), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        lastname: document.getElementById("Lastname").value,
        firstname: document.getElementById("name").value,
        email: document.getElementById("email").value,
        birthDate: birthDate,
        city: document.getElementById("city").value,
        postalCode: document.getElementById("postalCode").value,
      };

      // Appel API pour ajouter l'utilisateur
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        showConfetti();
        showToaster("User added to database!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        showToaster(
          result.error || "An error occurred while submitting the form.",
          "error"
        );
      }
    } catch (error) {
      showToaster("An error occurred while submitting the form.", "error");
    }
  };

  return (
    <div>
      {toaster.visible && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={() => setToaster({ ...toaster, visible: false })}
        />
      )}
      <h2>Nombre d'utilisateurs : {nbrUser}</h2>
      <ul>
        {users.map((u, idx) => (
          <li key={idx}>
            {u[1]} {u[2]}
          </li> 
        ))}
      </ul>
      <form data-testid="form" className="form" onSubmit={handleSubmit}>
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
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;
