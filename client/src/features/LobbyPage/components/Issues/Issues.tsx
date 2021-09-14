import { FunctionComponent } from "react";
import { IssuesSection } from "../IssuesSection";
import "./style.scss";

interface IssuesProps {
  message?: string;
}

export const Issues: FunctionComponent<IssuesProps> = (): JSX.Element => {
  return (
    <section className="issues">
      <h2 className="issues__title text-xl">Issues:</h2>
      <IssuesSection />
    </section>
  );
};
