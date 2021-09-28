/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputText, Switcher } from "../../../../components";
import { renderUserAvatar, spltName } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { MainPageContext } from "../../lib";
import "./Form.scss";

export const MainPageForm: FunctionComponent = (): JSX.Element => {
  const { MainPageState, setStrToAvatar, setImgToAvatar, submitData } =
    useContext(MainPageContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const avatarImg = watch("Choose file") as FileList;
  const firstNameField = watch("Your first name");
  const lastNameField = watch("Your last name");
  const userAvatar = renderUserAvatar(MainPageState.avatar);

  useEffect(() => {
    if (firstNameField || lastNameField) {
      const avaString = spltName(firstNameField, lastNameField);
      setStrToAvatar(avaString);
    }
    if (avatarImg && avatarImg.length > 0) {
      setImgToAvatar(URL.createObjectURL(avatarImg[0]), avatarImg[0].name);
    }
  }, [avatarImg, firstNameField, lastNameField]);

  return (
    <form
      id="main-form"
      className="register-form"
      onSubmit={handleSubmit(submitData)}
    >
      <div className="register-form__left-wrapper">
        <InputText
          inputProps={{
            labelText: "Your first name",
            labelClasses: "register-form__label",
          }}
          hookForm={{
            onRegister: register,
            regOptions: {
              required: { value: true, message: "This field is required" },
              maxLength: {
                value: 20,
                message: "Field cannot exceed 20 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Alphabetical characters only",
              },
            },
            isError: errors,
          }}
        />
        <InputText
          inputProps={{
            labelText: "Your last name",
            labelClasses: "register-form__label",
          }}
          hookForm={{
            onRegister: register,
            regOptions: {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Alphabetical characters only",
              },
            },
            isError: errors,
          }}
        />
        <InputText
          inputProps={{
            labelText: "Your Job position",
            labelClasses: "register-form__label",
          }}
          hookForm={{
            onRegister: register,
            regOptions: {
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Alphabetical characters only",
              },
            },
            isError: errors,
          }}
        />
        <div className="register-form__label register-form__label--mb">
          Image :
          <label className="register-form__label--file" htmlFor="avatarUpload">
            {MainPageState.inputFileLabel}
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
      {MainPageState.role === "Member" && (
        <div className="register-form__right-wrapper">
          <Switcher
            labelText="Connect as Observer"
            id="switcherBox4"
            register={register}
          />
        </div>
      )}
    </form>
  );
};
