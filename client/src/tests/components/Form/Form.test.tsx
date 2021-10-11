import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MainPageForm } from "../../../features/MainPage/components/Form/Form";

describe("MainPageForm", () => {
  it("should render the basic fields", () => {
    render(<MainPageForm />);
    expect(
      screen.getByRole("textbox", { name: /your first name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /your last name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /your job position/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });
});
