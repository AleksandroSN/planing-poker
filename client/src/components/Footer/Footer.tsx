import { FC } from "react";
import "./Footer.scss";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="App-footer">
      <div className="App-footer__wrapper">
        <div className="App-footer__collaborators">
          <div className="App-footer__collaborators-container">
            <a
              className="App-footer__collaborators-link"
              href="https://github.com/AleksandroSN/"
            >
              AleksandroSN
            </a>
          </div>
          <div className="App-footer__collaborators-container">
            <a
              className="App-footer__collaborators-link"
              href="https://github.com/khronic79"
            >
              khronic79
            </a>
          </div>
          <div className="App-footer__collaborators-container">
            <a
              className="App-footer__collaborators-link"
              href="https://github.com/Santerna"
            >
              Santerna
            </a>
          </div>
        </div>
        <div className="App-footer__copyright">Copyright ©2021</div>
        <div className="App-footer__rs-logo">
          <a href="https://rs.school/react/">
            <img
              src="../img/rs_school_js.svg"
              alt="rs school"
              className="App-footer__rs-logo__img"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
