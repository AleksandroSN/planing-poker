import { fireEvent, render } from "@testing-library/react";
import { Button } from "../../../components";

describe("calls onClick prop on button click", () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick} type="button" />);
  fireEvent.click(getByText(/start game/i));
  expect(onClick).toHaveBeenCalled();
});
