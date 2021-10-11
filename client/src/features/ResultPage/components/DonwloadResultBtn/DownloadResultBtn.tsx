import { FunctionComponent } from "react";
import { CSVDownloader } from "react-papaparse";
import { convertResult } from "../../../../lib";
import {
  IssuesRedux,
  ResultRedux,
  useAppSelector,
} from "../../../../redux/store";

export const DownloadResultBtn: FunctionComponent = (): JSX.Element => {
  const result = useAppSelector(ResultRedux);
  const { issues } = useAppSelector(IssuesRedux);
  const data = convertResult(result, issues);
  return (
    <CSVDownloader
      data={data}
      type="button"
      filename="result"
      className="button-start"
    >
      Download
    </CSVDownloader>
  );
};
