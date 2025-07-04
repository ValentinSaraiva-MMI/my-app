import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import Toaster from "./components/Toaster";
import SimpleForm from "./components/Forms/index";


/**
 * Test suite for the Form component.
 */
describe("Form", () => {
  /**
   * Test to ensure the form component renders correctly.
   */
  it("should render the component", () => {
    render(<App />); // render the component
    const form = screen.getByTestId("form"); // get the form
    expect(form).toBeInTheDocument(); // check if form is in the document
  });


/**
 * Test to validate that users under 18 years old are blocked in the date input.
 */
test("blocks under 18 years old in the date input", () => {
  render(<App />);
  const dateInput = screen.getByLabelText(/Enter your date of birth:/i);

  // Date valide (-19 ans)
  fireEvent.change(dateInput, { target: { value: "2005-01-01" } });
  expect(
    screen.queryByText(/Vous devez avoir au moins 18 ans./i)
  ).not.toBeInTheDocument();

  // Date invalide (-17 ans)
  fireEvent.change(dateInput, { target: { value: "2008-01-01" } });
  expect(
    screen.getByText(/Vous devez avoir au moins 18 ans./i)
  ).toBeInTheDocument();
});

/**
 * Test to validate the last name field.
 */
test("validates last name field", () => {
  render(<App />);
  const lastnameInput = screen.getByLabelText(/Enter your Last name:/i);

  // Valid last name
  fireEvent.change(lastnameInput, { target: { value: "Dupont" } });
  expect(
    screen.queryByText(
      /Le nom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).not.toBeInTheDocument();

  // Invalid last name
  fireEvent.change(lastnameInput, { target: { value: "Dupont123" } });
  expect(
    screen.getByText(
      /Le nom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).toBeInTheDocument();
});

/**
 * Test to validate the first name field.
 */
test("validates first name field", () => {
  render(<App />);
  const firstnameInput = screen.getByLabelText(/Enter your First name:/i);

  // Valid first name
  fireEvent.change(firstnameInput, { target: { value: "Élodie" } });
  expect(
    screen.queryByText(
      /Le prénom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).not.toBeInTheDocument();

  // Invalid first name
  fireEvent.change(firstnameInput, { target: { value: "Jean@!" } });
  expect(
    screen.getByText(
      /Le prénom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).toBeInTheDocument();
});

/**
 * Test to validate the email field.
 */
test("validates email field", () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/Enter your email:/i);

  // Valid email
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(
    screen.queryByText(/Veuillez entrer une adresse email valide./i)
  ).not.toBeInTheDocument();

  // Invalid email
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  expect(
    screen.getByText(/Veuillez entrer une adresse email valide./i)
  ).toBeInTheDocument();
});

/**
 * Test to validate the postal code field.
 */
test("validates postal code field", () => {
  render(<App />);
  const postalCodeInput = screen.getByLabelText(/Enter your postal code:/i);

  // Valid postal code
  fireEvent.change(postalCodeInput, { target: { value: "75001" } });
  expect(
    screen.queryByText(/Le code postal doit être composé de 5 chiffres./i)
  ).not.toBeInTheDocument();

  // Invalid postal code (less than 5 digits)
  fireEvent.change(postalCodeInput, { target: { value: "1234" } });
  expect(
    screen.getByText(/Le code postal doit être composé de 5 chiffres./i)
  ).toBeInTheDocument();

  // Invalid postal code (more than 5 digits)
  fireEvent.change(postalCodeInput, { target: { value: "123456" } });
  expect(
    screen.getByText(/Le code postal doit être composé de 5 chiffres./i)
  ).toBeInTheDocument();

  // Invalid postal code (letters)
  fireEvent.change(postalCodeInput, { target: { value: "ABCDE" } });
  expect(
    screen.getByText(/Le code postal doit être composé de 5 chiffres./i)
  ).toBeInTheDocument();
});

test("disables submit button when form is incorect", () => {
  render(<App />);
  const submitButton = screen.getByRole("button");

  fireEvent.change(screen.getByLabelText(/Enter your First name:/i), {
    target: { value: "Jean2" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your Last name:/i), {
    target: { value: "Dupo1" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your date of birth:/i), {
    target: { value: "2023-01-01" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your City:/i), {
    target: { value: "Mordor" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your email:/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your postal code:/i), {
    target: { value: "75001dd" },
  });

  // Vérifie que le bouton est désactivé au départ
  expect(submitButton).toBeDisabled();

  // Remplit correctement tous les champs requis
  fireEvent.change(screen.getByLabelText(/Enter your First name:/i), {
    target: { value: "Jean" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your Last name:/i), {
    target: { value: "Dupont" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your date of birth:/i), {
    target: { value: "2000-01-01" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your City:/i), {
    target: { value: "Antibes" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your email:/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your postal code:/i), {
    target: { value: "75001" },
  });

  // Vérifie que le bouton est activé
  expect(submitButton).not.toBeDisabled();
});

test("saves form data to localStorage on submit", () => {
  // Simuler un localStorage vide au départ
  const getItemSpy = jest
    .spyOn(Storage.prototype, "getItem")
    .mockReturnValue(null);

  const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

  render(<App />);

  fireEvent.change(screen.getByLabelText(/Enter your Last name:/i), {
    target: { value: "Dupont" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your First name:/i), {
    target: { value: "Jean" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your email:/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your date of birth:/i), {
    target: { value: "2000-01-01" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your City:/i), {
    target: { value: "Paris" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your postal code:/i), {
    target: { value: "75001" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Save/i }));

  expect(setItemSpy).toHaveBeenCalledWith(
    "formData",
    JSON.stringify([
      {
        lastname: "Dupont",
        firstname: "Jean",
        email: "test@example.com",
        birthDate: "2000-01-01",
        city: "Paris",
        postalCode: "75001",
      },
    ])
  );

  // Nettoyage
  getItemSpy.mockRestore();
  setItemSpy.mockRestore();
});

test("renders success toaster", () => {
  const onClose = jest.fn();
  render(<Toaster message="Success!" type="success" onClose={onClose} />);
  expect(screen.getByText("Success!")).toBeInTheDocument();
  expect(screen.getByText("Fermer")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Fermer"));
  expect(onClose).toHaveBeenCalled();
});

test("renders error toaster", () => {
  const onClose = jest.fn();
  render(<Toaster message="Error!" type="error" onClose={onClose} />);
  expect(screen.getByText("Error!")).toBeInTheDocument();
  expect(screen.getByText("Fermer")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Fermer"));
  expect(onClose).toHaveBeenCalled();
});


// Teste la récupération des utilisateurs (mock fetch)
test("fetches and displays users", async () => {
  const fakeUsers = {
    utilisateur: [
      [1, "Jean", "Dupont"],
      [2, "Marie", "Curie"],
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUsers),
    })
  );

  render(<SimpleForm />);
  expect(await screen.findByText("Jean Dupont")).toBeInTheDocument();
  expect(await screen.findByText("Marie Curie")).toBeInTheDocument();

  global.fetch.mockRestore();
});


// // Teste la validation de la ville
// test("validateCity sets error for unknown city", async () => {
//   // mock global.fetch avant tout
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve([]), // simulate "ville non trouvée"
//     })

//   );

//   render(<SimpleForm />);

//   const cityInput = screen.getByLabelText(/Enter your City:/i);

//   fireEvent.blur(cityInput, { target: { value: "Konoha" } });


//   await waitFor(() => {
//     expect(
//       screen.getByText("Cette ville n'existe pas en France.")
//     ).toBeInTheDocument();
//   });

//    window.fetch.mockRestore();
// });

test("validateCity clears error for valid city", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ nom: "Paris" }]),
    })
  );
  render(<SimpleForm />);
  const cityInput = screen.getByLabelText(/Enter your City:/i);
  fireEvent.blur(cityInput, { target: { value: "Paris" } });
  await screen.findByLabelText(/Enter your City:/i); // wait for update
  expect(screen.queryByText("Cette ville n'existe pas en France.")).not.toBeInTheDocument();
  expect(screen.queryByText("Veuillez entrer une ville valide.")).not.toBeInTheDocument();
  global.fetch.mockRestore();
});

});