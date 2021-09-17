import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Button, InputSelect, InputText } from "../../../../components";
import { FormValues } from "../../../../types/interface";
import { IssueFormHelper } from "./issueFormHelper";
import "./style.scss";

export const IssuesForm: FunctionComponent = (): JSX.Element => {
  const { addNewIssue, updateIssue, clearIssue, currentIssue } =
    IssueFormHelper();
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form
      onSubmit={
        currentIssue ? handleSubmit(updateIssue) : handleSubmit(addNewIssue)
      }
    >
      <InputText
        labelText="Title:"
        register={register}
        defaultValue={currentIssue ? currentIssue.title : ""}
      />
      <InputText
        labelText="Link:"
        register={register}
        defaultValue={currentIssue ? currentIssue.link : ""}
      />
      <InputSelect
        labelText="Priority:"
        register={register}
        defaultValue={currentIssue ? currentIssue.priority : ""}
      />
      <div className="modal-buttons">
        <Button type="submit" classes="button-start">
          Yes
        </Button>
        <Button onClick={clearIssue} type="button" classes="button-cancel">
          No
        </Button>
      </div>
    </form>
  );
};
