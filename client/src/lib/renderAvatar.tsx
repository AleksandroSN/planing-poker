export const renderUserAvatar = (avatar: string): JSX.Element => {
  if (avatar && avatar.length <= 2) {
    return (
      <span className="user__avatar--span text-xl text-bold">{`${avatar}`}</span>
    );
  }
  return (
    <img src={`${avatar}`} alt="Your avatar" className="user__avatar--img" />
  );
};
