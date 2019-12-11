import React from "react";
import ContactForm from "../index";
import testCases from "./test_cases.json";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Globals
let nameInput, emailInput, messageInput;

// Mocking window.scrollTo to hide the error
// src: https://qiita.com/akameco/items/0edfdae02507204b24c8
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

beforeAll(() => {
  const { contactForm, getByTestId } = render(<ContactForm />);
  nameInput = getByTestId("nameInput");
  emailInput = getByTestId("emailInput");
  messageInput = getByTestId("messageInput");
});

test("ContactsInfo renders successfuly", () => {
  const componentTree = renderer.create(<ContactForm />);
  expect(componentTree).toMatchSnapshot();
});

test("Input is entered to the textboxes correctly", () => {
  nameInput.value = testCases[0].name;
  emailInput.value = testCases[0].email;
  messageInput.value = testCases[0].message;
  expect(nameInput.value).toBe(testCases[0].name);
  expect(emailInput.value).toBe(testCases[0].email);
  expect(messageInput.value).toBe(testCases[0].message);
});


