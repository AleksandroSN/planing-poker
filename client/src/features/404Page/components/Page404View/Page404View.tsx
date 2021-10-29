import { FunctionComponent } from "react";
import "./style.scss";

interface Page404ViewProps {
  message?: string;
}

export const Page404View: FunctionComponent<Page404ViewProps> = ({
  message = "404 PAGE",
}): JSX.Element => {
  return (
    <div className="page-404__wrapper">
      <div className="page-404__container">
        <p className="page-404__title">{message}</p>
        <p className="page-404__subtitle">Warning</p>
        <p className="page-404__text">
          Because of something you did, Planning poker is highly unstable. You
          can try to restore App , if that wont work restart your computer.
        </p>
        <p className="page-404__error">
          ERROR : 0x000dsc80,0x033d0080,0x00660090,0x000xxx80,0x05123480
        </p>
        <a href="/">GO TO HOME</a>
      </div>
    </div>
  );
};
