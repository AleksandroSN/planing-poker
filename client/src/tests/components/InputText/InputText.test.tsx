import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MainPageForm } from "../../../features/MainPage/components/Form";

describe("Modal input", () => {
  it("render file input", () => {
    render(<MainPageForm />);
    const inputEl = screen.getByTestId("avatarUpload");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });
});
