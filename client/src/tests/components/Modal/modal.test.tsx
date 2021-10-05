import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

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
});
