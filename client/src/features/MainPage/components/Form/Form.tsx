/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { InputText, Button } from "../../../../components";
import "./Form.scss";

type FormData = {
  firstName: string;
  lastName: string;
  jobPosition: string;
  avatarUpload: string | Blob;
};

export const MainPageForm: FunctionComponent = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        labelText="Your first name"
        defaultValue=""
        // {...register("firstName", {
        //   required: true,
        //   maxLength: 20,
        //   pattern: /^[A-Za-z]+$/i,
        // })}
        register={register}
      />
      {errors?.firstName?.type === "required" && <p>This field is required</p>}
      {errors?.firstName?.type === "maxLength" && (
        <p>First name cannot exceed 20 characters</p>
      )}
      {errors?.firstName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <InputText
        labelText="Your last name"
        defaultValue=""
        // {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
        register={register}
      />
      {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <InputText
        labelText="Your Job position"
        defaultValue=""
        // {...register("jobPosition", { pattern: /^[A-Za-z]+$/i })}
        register={register}
      />
      {errors?.lastName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}
      <label htmlFor="avatarUpload">
        <input {...register} type="file" name="avatarUpload" />
      </label>
      <div className="modal-buttons">
        <Button
          onClick={() => console.log(`confirm`)}
          classes="button-start"
          type="submit"
        >
          Confirm
        </Button>
        <Button
          type="reset"
          onClick={() => console.log(`close`)}
          classes="button-cancel"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
