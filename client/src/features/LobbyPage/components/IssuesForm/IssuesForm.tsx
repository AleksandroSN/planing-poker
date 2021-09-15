import { FunctionComponent } from "react";
import { InputSelect, InputText } from "../../../../components";
import { IssuesModel } from "../../types/interface";
import "./style.scss";

interface IssuesFormProps {
  updateIssues?: (data: IssuesModel) => void;
}

export const IssuesForm: FunctionComponent<IssuesFormProps> =
  (): JSX.Element => {
    return (
      <form>
        <InputText labelText="Title:" />
        <InputText labelText="Link:" />
        <InputSelect labelText="Priority:" />
      </form>
    );
  };
