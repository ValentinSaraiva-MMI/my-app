import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("check counter on click me button", () => {
  render(<App />); // render the component
  const button = screen.getByRole("button"); // get the button
  const counter = screen.getByTestId("count"); // get the counter
  expect(button).toBeInTheDocument(); // check if button is in the document
  expect(counter).toBeInTheDocument(); // check if counter is in the document
  expect(counter).toHaveTextContent("0"); // check if counter is 0
  fireEvent.click(button); // click the button
  expect(counter).toHaveTextContent("1"); // check if counter is 1
});
