import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "jest-location-mock";
import Navbar from "../index";

jest.mock("nanoid");

describe("Navbar component", () => {
  const initialState = {
    selected: null,
    fromShapeId: null,
    shapes: {},
    connectors: [],
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);

  test("Navbar should render successfully", () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
    expect(
      screen.getByRole("button", {
        name: /Upload button/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Download button/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Reset button/i,
      })
    ).toBeInTheDocument();
  });
  test("form should render successfully", () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
    expect(screen.getByLabelText("label")).toBeInTheDocument();
    expect(screen.getByLabelText("node-input")).toBeInTheDocument();
  });
});
