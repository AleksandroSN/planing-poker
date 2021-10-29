interface TimerClassesModel {
  main: string;
}

export const timerClasses = (settings: boolean): TimerClassesModel => {
  const classes = {
    main: settings ? "window timer timer--settings" : "window timer",
  };
  return classes;
};

export const splitStr = (str: string, separator: string): Array<string> => {
  return str.split(separator);
};
