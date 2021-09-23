import { FunctionComponent } from "react";

interface AddIssueProps {
  toggleModal: () => void;
}

export const AddIssue: FunctionComponent<AddIssueProps> = ({
  toggleModal,
}): JSX.Element => {
  return (
    <div className="issues__item" onClick={toggleModal} role="none">
      <div className="issues__item-row">
        <p className="issues__item-text">Create new Issue</p>
        <img src="../icons/cross2.svg" alt="add new issue" />
      </div>
    </div>
  );
};
