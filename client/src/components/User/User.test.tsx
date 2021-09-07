import { render } from "@testing-library/react";
import { User } from "./User";

const testData = {
  firstName: "Saimon",
  lastName: "Aleksandrov",
  jobPosition: "Junior Front-end",
};

describe("test User component", () => {
  it("check render", () => {
    const { getByText } = render(
      <User {...testData} isYou={true} isChat={false} avatar="SA" />
    );
    const phrase = getByText(/you/i);
    expect(phrase).toBeInTheDocument();
  });
  it("avatar is image", () => {
    const { getByAltText } = render(
      <User
        {...testData}
        isYou={true}
        isChat={false}
        avatar="./img/avatar.png"
      />
    );
    const imageRender = getByAltText(/avatar/i);
    expect(imageRender).toBeInTheDocument();
  });
  it("other member, not you", () => {
    const { getByAltText } = render(
      <User {...testData} isYou={false} isChat={true} avatar="SA" />
    );
    const buttonRender = getByAltText(/cancel/i);
    expect(buttonRender).toBeInTheDocument();
  });
});
