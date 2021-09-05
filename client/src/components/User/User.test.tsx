import { render } from "@testing-library/react";
import { User } from "./User";

describe("test User component", () => {
  it("check render", () => {
    const { getByText } = render(
      <User
        firstName="Saimon"
        lastName="Aleksandrov"
        jobPosition="Junior Front-end"
        isYou={true}
        avatar="SA"
        isChat={false}
      />
    );
    const phrase = getByText(/you/i);
    expect(phrase).toBeInTheDocument();
  });
  it("avatar is image", () => {
    const { getByAltText } = render(
      <User
        firstName="Saimon"
        lastName="Aleksandrov"
        jobPosition="Junior Front-end"
        isYou={true}
        avatar="./img/avatar.png"
        isChat={false}
      />
    );
    const imageRender = getByAltText(/avatar/i);
    expect(imageRender).toBeInTheDocument();
  });
  it("other member, not you", () => {
    const { getByAltText } = render(
      <User
        firstName="Saimon"
        lastName="Aleksandrov"
        jobPosition="Junior Front-end"
        isYou={false}
        avatar="./img/avatar.png"
        isChat={true}
      />
    );
    const buttonRender = getByAltText(/cancel/i);
    expect(buttonRender).toBeInTheDocument();
  });
});
