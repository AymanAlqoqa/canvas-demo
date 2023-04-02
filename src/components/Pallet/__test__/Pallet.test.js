import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Pallet from "../index";

describe("Pallet component", () => {
  test("should render successfully", () => {
    render(<Pallet />);
    expect(screen.getByTestId(/rectangle-shape/i)).toBeInTheDocument();
    expect(screen.getByTestId(/circle-shape/i)).toBeInTheDocument();
  });
});
