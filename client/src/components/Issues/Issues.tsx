import { FunctionComponent } from "react";
import {
  IssueContextHelper,
  IssueContext,
} from "../../lib/context/issueContext";
import { IssuesSection } from "./IssuesSection";
import "./style.scss";

interface IssuesProps {
  message?: string;
}

export const Issues: FunctionComponent<IssuesProps> = (): JSX.Element => {
  const IssueCTX = IssueContextHelper();
  return (
    <IssueContext.Provider value={IssueCTX}>
      <section className="issues">
        <h2 className="issues__title text-xl">Issues:</h2>
        <IssuesSection />
      </section>
    </IssueContext.Provider>
  );
};
