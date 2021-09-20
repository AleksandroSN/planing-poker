import { FC } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "../../../../components";
import { Button } from "../../../../components/Button/Button";
import "./Form.scss";

type FormData = {
    firstName: string;
    lastName: string;
    jobPosition: string;
    avatarUpload: string | Blob;
};

const Form: FC = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
        <InputText labelText="Your first name" defaultValue="" {...register("firstName", {
=======
        <InputText labelText="Your first name:" {...register("firstName", {
>>>>>>> 7eff4ae (fix: fix img src, change input to InputText)
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })} />
        {errors?.firstName?.type === "required" && <p>This field is required</p>}
        {errors?.firstName?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
<<<<<<< HEAD
        <InputText labelText="Your last name" defaultValue="" {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
        )}
        <InputText labelText="Your Job position" defaultValue="" {...register("jobPosition", { pattern: /^[A-Za-z]+$/i })} />
=======
        <InputText labelText="Your last name:" {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
        )}
        <InputText labelText="Your job position:" {...register("jobPosition", { pattern: /^[A-Za-z]+$/i })} />
>>>>>>> 7eff4ae (fix: fix img src, change input to InputText)
        {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
        )}
        <label htmlFor="avatarUpload">
          <input {...register} type="file" name="avatarUpload" />
        </label>
        <div className="modal-buttons">
        <Button
<<<<<<< HEAD
          onClick={() => console.log(`confirm`)}
          classes="button-start"
          type="submit">
              Confirm
        </Button>
        <Button type="reset" onClick={close} classes="button-cancel">
            Cancel
        </Button>
=======
          text="Confirm"
          onClick={() => console.log(`confirm`)}
          classes="button-start"
        />
        <Button text="Cancel" onClick={close} classes="button-cancel" />
>>>>>>> 7eff4ae (fix: fix img src, change input to InputText)
      </div>
    </form>
  )
}

export {Form};