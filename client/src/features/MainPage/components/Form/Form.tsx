/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { InputText, Button, Switcher } from "../../../../components";
import { renderUserAvatar } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import "./Form.scss";
import { MainPageFormProps } from "./types";

export const MainPageForm: FunctionComponent<MainPageFormProps> = ({
  toggleState,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);
  const [inputFileLaber, setInputFileLabel] = useState<string>("Choose file");
  const [avatar, setAvatar] = useState<string>("SG");
  const avatarImg = watch("Choose file") as FileList;
  const userAvatar = renderUserAvatar(avatar);

  useEffect(() => {
    // console.log(avatarImg);
    if (avatarImg && avatarImg.length > 0) {
      setInputFileLabel(avatarImg[0].name);
      setAvatar(URL.createObjectURL(avatarImg[0]));
    }
  }, [avatarImg]);

  useEffect(() => {
    // console.log(avatarImg);
    if (avatarImg && avatarImg.length > 0) {
      setInputFileLabel(avatarImg[0].name);
      setAvatar(URL.createObjectURL(avatarImg[0]));
    }
  }, [avatarImg]);

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="register-form__left-wrapper">
        <InputText
          labelText="Your first name"
          labelClasses="register-form__label"
          defaultValue=""
          register={register}
          options={{
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          }}
        />
        {errors?.["Your first name"]?.type === "required" && (
          <p>This field is required</p>
        )}
        {errors?.["Your first name"]?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.["Your first name"]?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <InputText
          labelText="Your last name"
          labelClasses="register-form__label"
          defaultValue=""
          options={{ pattern: /^[A-Za-z]+$/i }}
          register={register}
        />
        {errors?.["Your last name"]?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <InputText
          labelText="Your Job position"
          labelClasses="register-form__label"
          defaultValue=""
          options={{ pattern: /^[A-Za-z]+$/i }}
          register={register}
        />
        {errors?.["Your last name"]?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <div className="register-form__label register-form__label--mb">
          Image :
          <label className="register-form__label--file" htmlFor="avatarUpload">
            {inputFileLaber}
            <input
              type="file"
              id="avatarUpload"
              accept=".jpg, .jpeg, .png"
              hidden
              {...register("Choose file")}
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
        <NavLink to="/lobby/sssss">
          <Button classes="button-start" type="submit">
            Confirm
          </Button>
        </NavLink>
        <Button type="button" onClick={toggleState} classes="button-cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};
