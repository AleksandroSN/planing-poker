/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { InputText, Button, Switcher } from "../../../../components";
import { renderUserAvatar } from "../../../../lib";
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

  const userAvatar = renderUserAvatar("SG");

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="register-form__left-wrapper">
        <InputText
          labelText="Your first name"
          labelClasses="register-form__label"
          defaultValue=""
          // {...register("firstName", {
          //   required: true,
          //   maxLength: 20,
          //   pattern: /^[A-Za-z]+$/i,
          // })}
          register={register}
        />
        {errors?.firstName?.type === "required" && (
          <p>This field is required</p>
        )}
        {errors?.firstName?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <InputText
          labelText="Your last name"
          labelClasses="register-form__label"
          defaultValue=""
          // {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
          register={register}
        />
        {errors?.lastName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <InputText
          labelText="Your Job position"
          labelClasses="register-form__label"
          defaultValue=""
          // {...register("jobPosition", { pattern: /^[A-Za-z]+$/i })}
          register={register}
        />
        {errors?.lastName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <div className="register-form__label register-form__label--mb">
          Image :
          <label className="register-form__label--file" htmlFor="avatarUpload">
            Choose file
            <input
              type="file"
              id="avatarUpload"
              accept=".jpg, .jpeg, .png"
              hidden
              {...register("avatarUpload")}
            />
          </label>
        </div>
        <div className="register-form__avatar">{userAvatar}</div>
      </div>
      <div className="register-form__right-wrapper">
        <Switcher
          labelText="Connect as Observer"
          id="switcherBox4"
          register={register}
        />
      </div>
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
