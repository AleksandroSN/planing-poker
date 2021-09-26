/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputText, Button, Switcher } from "../../../../components";
import { renderUserAvatar, spltName } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { MainPageContext } from "../../lib/context/mainPageContext";
import "./Form.scss";

export const MainPageForm: FunctionComponent = (): JSX.Element => {
  const {
    MainPageState,
    toggleModal,
    setStrToAvatar,
    setImgToAvatar,
    submitData,
  } = useContext(MainPageContext);

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
  }, [
    avatarImg,
    firstNameField,
    lastNameField,
    setImgToAvatar,
    setStrToAvatar,
  ]);

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
    <form className="register-form" onSubmit={handleSubmit(submitData)}>
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
      <div className="modal-buttons">
        <Button classes="button-start" type="submit">
          Confirm
        </Button>
        <Button type="button" onClick={toggleModal} classes="button-cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};
