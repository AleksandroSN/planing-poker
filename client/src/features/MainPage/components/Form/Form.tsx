/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { InputText, Button, Switcher } from "../../../../components";
import { BASE, renderUserAvatar, spltName } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { MainPageFormProps } from "./types";
import { createMaster } from "../../../Socket/lib/createMaster";
import { NewPlayer } from "../../../Socket/types";
import { CreateNewFile } from "../../lib";
import "./Form.scss";

export const MainPageForm: FunctionComponent<MainPageFormProps> = ({
  toggleState,
  role,
  toggleAuth,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [inputFileLabel, setInputFileLabel] = useState<string>("Choose file");
  const [avatar, setAvatar] = useState<string>("NN");
  const [newPlayer, setNewPlayer] = useState<NewPlayer>();

  const avatarImg = watch("Choose file") as FileList;
  const firstNameField = watch("Your first name");
  const lastNameField = watch("Your last name");
  const userAvatar = renderUserAvatar(avatar);
  const onSubmit = async (data: FormValues) => {
    const files = data["Choose file"] as FileList;
    const file = files[0];
    const fileName = files[0].name;
    if (files) {
      const res = await CreateNewFile(file, fileName);
      const observerRole = data["Connect as Observer"] && "Observer";
      const player: NewPlayer = {
        firstName: data["Your first name"],
        lastName: data["Your last name"],
        jobPosition: data["Your Job position"],
        avatarImage: `${BASE}${res[0].path}`,
        role: observerRole || role,
      };
      setNewPlayer(player);
      toggleState();
    }
  };

  useEffect(() => {
    if (firstNameField || lastNameField) {
      const avaString = spltName(firstNameField, lastNameField);
      setAvatar(avaString);
    }
    if (avatarImg && avatarImg.length > 0) {
      setInputFileLabel(avatarImg[0].name);
      setAvatar(URL.createObjectURL(avatarImg[0]));
    }
  }, [avatarImg, firstNameField, lastNameField]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (newPlayer) {
        await createMaster(newPlayer, dispatch);
        toggleAuth();
      }
    })();
    return () => {};
  }, [dispatch, newPlayer, toggleAuth]);

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
            {inputFileLabel}
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
      {role === "Member" && (
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
        <Button type="button" onClick={toggleState} classes="button-cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};
