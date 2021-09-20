import { FC } from "react";
import "./Footer.scss";

const Footer: FC = (): JSX.Element => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="app-dev__container">
          <div>
            <a href="https://github.com/AleksandroSN/">AleksandroSN</a>
          </div>
          <div>
            <a href="https://github.com/khronic79">khronic79</a>
          </div>
          <div>
            <a href="https://github.com/Santerna">Santerna</a>
          </div>
        </div>
        <div className="copyright">Copyright ©2021</div>
        <div className="rs-logo">
          <a href="https://rs.school/react/">
            <img src="../../../public/img/rs_school_js.svg" alt="rs school" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { Footer };
