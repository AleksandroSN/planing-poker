interface TimerClassesModel {
  main: string;
}

export const TimerClasses = (settings: boolean): TimerClassesModel => {
  const classes = {
    main: settings ? "timer timer--settings" : "timer",
  };
  return classes;
};
