import { FunctionComponent } from "react";
import { InputRadio } from "../../../../components";
import { SelectCardsProps } from "./types";
import "./selectCardsSet.scss";

export const SelectCardsSet: FunctionComponent<SelectCardsProps> = ({
  onRegister,
  errors,
}): JSX.Element => {
  return (
    <div className="lobby-page__cards-value">
      <h2>Choose cards deck</h2>
      <InputRadio
        inputProps={{
          labelText: "cardsValue",
          idInput: "fibonacciSet",
          inputText:
            "Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass)",
          inputValue: "Fibonacci",
        }}
        hookForm={{
          onRegister,
          regOptions: {
            required: { value: true, message: "Cards deck is required" },
          },
          isError: errors,
        }}
      />
      <InputRadio
        inputProps={{
          labelText: "cardsValue",
          idInput: "modFibonacciSet",
          inputText:
            "Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, Pass)",
          inputValue: "Modified Fibonacci",
        }}
        hookForm={{
          onRegister,
        }}
      />
      <InputRadio
        inputProps={{
          labelText: "cardsValue",
          idInput: "powerSet",
          inputText: "Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ?, Pass)",
          inputValue: "Powers of 2",
        }}
        hookForm={{
          onRegister,
        }}
      />
      <InputRadio
        inputProps={{
          labelText: "cardsValue",
          idInput: "tShirtSet",
          inputText: "T-shirts ( xxs, xs, s, m, l, xl, xxl, ?, Pass )",
          inputValue: "T-shirts",
        }}
        hookForm={{
          onRegister,
        }}
      />
    </div>
  );
};
