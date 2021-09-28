import { FunctionComponent } from "react";
import { InputTextProps } from "./types";
// import { dictErrors } from "../../lib";

// export const handlerErrors = (
//   hookForm: HookFormDep | undefined,
//   inputProps: InputTextDep
// ): (false | JSX.Element | null)[] => {
//   const errors = dictErrors.map(({ type, message }) => {
//     if (
//       hookForm &&
//       hookForm.isError &&
//       hookForm.isError[`${inputProps.labelText}`]
//     ) {
//       return (
//         hookForm.isError[`${inputProps.labelText}`].type === type && (
//           <span className="input-text__error">{`${message}`}</span>
//         )
//       );
//     }
//     return null;
//   });
//   return errors;
// };

export const handlerErrors: FunctionComponent<InputTextProps> = ({
  hookForm,
  inputProps,
}): JSX.Element | null => {
  if (
    hookForm &&
    hookForm.isError &&
    hookForm.isError[`${inputProps.labelText}`]
  ) {
    return (
      <span className="input-text__error">{`${
        hookForm.isError[`${inputProps.labelText}`].message
      }`}</span>
    );
  }
  return null;
};
