import { render } from "@testing-library/react";
import { GamePage } from "../features/GamePage";

it("check Game page render", () => {
  const { getByText } = render(<GamePage />);
  const text = getByText(/players/i);
  expect(text).toBeInTheDocument();
});
