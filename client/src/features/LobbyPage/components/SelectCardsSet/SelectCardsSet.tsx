import { FunctionComponent } from "react";
import "./selectCardsSet.scss";

export const SelectCardsSet: FunctionComponent = (): JSX.Element => {
  return (
    <div>
      <form className="lobby-page__cards-value">
        <label htmlFor="fibonacciSet" className="lobby-page__cards-value__item">
          <input
            type="radio"
            value="Fibonacci"
            name="cardsValue"
            id="fibonacciSet"
            className="lobby-page__cards-value__input"
          />
          <span className="lobby-page__cards-value__text">
            Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass)
          </span>
        </label>
        <label
          htmlFor="modFibonacciSet"
          className="lobby-page__cards-value__item"
        >
          <input
            type="radio"
            value="Modified Fibonacci"
            name="cardsValue"
            id="modFibonacciSet"
            className="lobby-page__cards-value__input"
          />
          <span className="lobby-page__cards-value__text">
            Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, Pass)
          </span>
        </label>
        <label htmlFor="powerSet" className="lobby-page__cards-value__item">
          <input
            type="radio"
            value="Powers of 2"
            name="cardsValue"
            id="powerSet"
            className="lobby-page__cards-value__input"
          />
          <span className="lobby-page__cards-value__text">
            Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ?, Pass)
          </span>
        </label>
        <label htmlFor="tShirtSet" className="lobby-page__cards-value__item">
          <input
            type="radio"
            value="T-shirts"
            name="cardsValue"
            id="tShirtSet"
            className="lobby-page__cards-value__input"
          />
          <span className="lobby-page__cards-value__text">
            T-shirts ( xxs, xs, s, m, l, xl, xxl, ?, Pass )
          </span>
        </label>
      </form>
    </div>
  );
};
