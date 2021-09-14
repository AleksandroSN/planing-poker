export const searchEnterKey = (
  ev: React.KeyboardEvent<HTMLInputElement>,
  cb: () => void
): void => {
  if (ev.key === "Enter") {
    cb();
  }
};
