import { render } from "@testing-library/react";
import { Page404 } from "../features/404Page";

it("check 404 page render", () => {
  const { getByText } = render(<Page404 />);
  const text = getByText(/warning/i);
  expect(text).toBeInTheDocument();
});
