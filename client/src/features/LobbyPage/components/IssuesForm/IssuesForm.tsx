import { FunctionComponent, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, InputSelect, InputText } from "../../../../components";
import { FormValues } from "../../../../types/interface";
import { IssueContext } from "../../lib/context/issueContext";
import { IssuesModel } from "../../types/interface";
import "./style.scss";

interface IssuesFormProps {
  updateIssues?: (data: IssuesModel) => void;
}

export const IssuesForm: FunctionComponent<IssuesFormProps> =
  (): JSX.Element => {
    const { toggleIsOpen } = useContext(IssueContext);
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText labelText="Title:" register={register} />
        <InputText labelText="Link:" register={register} />
        <InputSelect labelText="Priority:" register={register} />
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
