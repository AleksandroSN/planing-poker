import { FunctionComponent } from "react";
import { CSVDownloader } from "react-papaparse";

export const DownloadResultBtn: FunctionComponent = (): JSX.Element => {
  return (
    <CSVDownloader
      data={[
        {
          "Issue first": "1",
          Card: 22,
          Percents: "22%",
        },
        {
          "Issue first": "1",
          Card: 33,
          Percents: "33%",
        },
        {
          "Issue first": "1",
          Card: 44,
          Percents: "22%",
        },
        {
          "Issue first": "2",
          Card: 66,
          Percents: "22%",
        },
        {
          "Issue first": "2",
          Card: 77,
          Percents: "33%",
        },
        {
          "Issue first": "2",
          Card: 99,
          Percents: "22%",
        },
      ]}
      type="button"
      filename="result"
      className="button-start"
    >
      Download
    </CSVDownloader>
  );
};
