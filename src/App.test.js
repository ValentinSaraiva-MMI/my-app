import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Form", () => {
  it("should render the component", () => {
    render(<App />); // render the component
    const form = screen.getByTestId("form"); // get the form
    expect(form).toBeInTheDocument(); // check if form is in the document
  });
});

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

test("validates last name field", () => {
  render(<App />);
  const lastnameInput = screen.getByLabelText(/Enter your Last name:/i);

  fireEvent.change(lastnameInput, { target: { value: "Dupont" } });
  expect(
    screen.queryByText(
      /Le nom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).not.toBeInTheDocument();

  fireEvent.change(lastnameInput, { target: { value: "Dupont123" } });
  expect(
    screen.getByText(
      /Le nom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).toBeInTheDocument();
});

test("validates first name field", () => {
  render(<App />);
  const firstnameInput = screen.getByLabelText(/Enter your First name:/i);

  fireEvent.change(firstnameInput, { target: { value: "Élodie" } });
  expect(
    screen.queryByText(
      /Le prénom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).not.toBeInTheDocument();

  fireEvent.change(firstnameInput, { target: { value: "Jean@!" } });
  expect(
    screen.getByText(
      /Le prénom ne doit contenir que des lettres, accents ou tirets./i
    )
  ).toBeInTheDocument();
});
