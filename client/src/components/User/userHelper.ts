export const userClassesHelper = (chat: boolean) => {
  const classes = {
    user: chat ? "user" : "user",
    wrapper: chat ? "user__wrapper user__wrapper--chat" : "user__wrapper",
    avatar: chat ? "user__avatar user__avatar--chat" : "user__avatar",
    body: chat ? "user__body" : "user__body",
    valid: chat
      ? "user__valid-user text-xs text-bold"
      : "user__valid-user text-bold",
    name: chat
      ? "user__name text-l text-light"
      : "user__name text-xl text-light",
    job: chat ? "user__job text-xs text-light" : "user__job text-xs text-light",
    button: chat ? "user__button" : "user__button",
    buttonBody: chat ? "user__button-body" : "user__button-body",
    buttonImg: chat
      ? "user__button-img user__button-img--chat"
      : "user__button-img",
  };
  return classes;
};
