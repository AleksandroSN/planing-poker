import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "../App";
import { store } from "../redux";

test("renders start game link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByText(/Start new game/i);
  expect(linkElement).toBeInTheDocument();
});
