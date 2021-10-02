import { FunctionComponent } from "react";
import { AppSettings, useAppSelector } from "../../redux/store";
import "./style.scss";

export const Loader: FunctionComponent = (): JSX.Element => {
  const { isLoading } = useAppSelector(AppSettings);

  return (
    <>
      {isLoading && (
        <div className="loader__overlay">
          <div className="loader">Loading...</div>
        </div>
      )}
    </>
  );
};
