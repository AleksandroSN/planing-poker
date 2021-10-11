import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import { Modal } from "../../../components";
import { MainPageForm as Form } from "../../../features/MainPage/components/Form/index";

describe("renders modal window", () => {
  it("snapshot", () => {
    render(
      <Modal
        onCancel={() => console.log("cancel")}
        open
        heading="Start new game"
        buttonTextConfirm="Confirm"
        buttonTextCancel="Cancel"
      >
        <Form />
      </Modal>
    );
    expect(document.body.lastChild).toMatchSnapshot();
  });

  it("modal shows the children and a close button", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <Modal
        onCancel={() => console.log("cancel")}
        open={false}
        heading=""
        buttonTextConfirm=""
        buttonTextCancel=""
      >
        <Form />
      </Modal>
    );
    expect(getByText("Your first name")).toBeTruthy();
    fireEvent.click(getByText(/cancel/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
