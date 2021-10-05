import { render } from "@testing-library/react";
import { LobbyPage } from "../features/LobbyPage";

it("check 404 page render", () => {
  const { getByText } = render(<LobbyPage />);
  const text = getByText(/Members/i);
  expect(text).toBeInTheDocument();
});
