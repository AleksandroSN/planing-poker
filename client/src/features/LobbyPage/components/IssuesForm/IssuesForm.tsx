import { FunctionComponent, useContext } from "react";
import { Button, InputSelect, InputText } from "../../../../components";
import { IssueContext } from "../../lib/context/issueContext";
import { IssuesModel } from "../../types/interface";
import "./style.scss";

interface IssuesFormProps {
  updateIssues?: (data: IssuesModel) => void;
}

export const IssuesForm: FunctionComponent<IssuesFormProps> =
  (): JSX.Element => {
    const { toggleIsOpen } = useContext(IssueContext);
    return (
      <form>
        <InputText labelText="Title:" />
        <InputText labelText="Link:" />
        <InputSelect labelText="Priority:" />
        <div className="modal-buttons">
          <Button type="submit" classes="button-start">
            Yes
          </Button>
          <Button onClick={toggleIsOpen} type="button" classes="button-cancel">
            No
          </Button>
        </div>
      </form>
    );
  };
