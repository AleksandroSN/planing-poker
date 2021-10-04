import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { InputSelect, InputText } from "../..";
import { FormValues } from "../../../types/interface";
import { IssueFormHelper } from "./issueFormHelper";
import "./style.scss";

export const IssuesForm: FunctionComponent = (): JSX.Element => {
  const { addNewIssue, updateIssue, currentIssue } = IssueFormHelper();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form
      id="issue-form"
      className="issue__form"
      onSubmit={
        currentIssue ? handleSubmit(updateIssue) : handleSubmit(addNewIssue)
      }
    >
      <InputText
        inputProps={{
          labelText: "Title",
          labelClasses: "issue__form-label",
          inputClasses: "issue__form-input",
          defaultValue: `${currentIssue ? currentIssue.title : ""}`,
        }}
        hookForm={{
          onRegister: register,
        }}
      />
      <InputText
        inputProps={{
          labelText: "Link",
          labelClasses: "issue__form-label",
          inputClasses: "issue__form-input",
          defaultValue: `${currentIssue ? currentIssue.link : ""}`,
        }}
        hookForm={{
          onRegister: register,
          regOptions: {
            required: { value: true, message: "This field is required" },
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i,
              message: "Link only",
            },
          },
          isError: errors,
        }}
      />
      <InputSelect
        labelText="Priority"
        onRegister={register}
        defaultValue={currentIssue ? currentIssue.priority : ""}
      />
    </form>
  );
};
