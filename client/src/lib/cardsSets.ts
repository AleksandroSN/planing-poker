export interface IValue {
  cardValue: string;
  selected: boolean;
  disabled: boolean;
}

export interface ICardsSets {
  category: string;
  value: Array<IValue>;
}

export const cardsSets: ICardsSets[] = [
  {
    category: "Fibonacci",
    value: [
      {
        cardValue: "0",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "1",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "2",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "3",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "5",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "8",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "13",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "21",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "34",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "55",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "89",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "?",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "Pass",
        selected: false,
        disabled: false,
      },
    ],
  },
  {
    category: "Modified Fibonacci",
    value: [
      {
        cardValue: "0",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "½",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "1",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "2",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "3",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "5",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "8",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "13",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "20",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "40",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "100",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "?",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "Pass",
        selected: false,
        disabled: false,
      },
    ],
  },
  {
    category: "Powers of 2",
    value: [
      {
        cardValue: "0",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "1",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "2",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "4",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "8",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "16",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "32",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "64",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "?",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "Pass",
        selected: false,
        disabled: false,
      },
    ],
  },
  {
    category: "T-shirts",
    value: [
      {
        cardValue: "xxs",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "xs",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "s",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "m",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "l",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "xl",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "xxl",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "?",
        selected: false,
        disabled: false,
      },
      {
        cardValue: "Pass",
        selected: false,
        disabled: false,
      },
    ],
  },
];
