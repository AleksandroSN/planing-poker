// import { FunctionComponent, useState } from "react";
// import { IssuesModel } from "../../types/interface";
// import { Issue } from "../IssueItem/Issue";
// import { issuesMocks } from "../Issues/issuesMocks";
// import "./issueSection.scss";

// interface IssuesSectionProps {
//   toggleModal: () => void;
// }

// export const IssuesSection: FunctionComponent<IssuesSectionProps> = ({
//   toggleModal,
// }): JSX.Element => {
//   const [issue, setIssue] = useState<IssuesModel[]>(issuesMocks);

//   const renderIssues = issue.map(({ name, priority }) => {
//     return (
//       <Issue
//         key={name}
//         issueName={name}
//         priority={priority}
//         toggleModal={toggleModal}
//       />
//     );
//   });
//   const renderAll = [
//     ...renderIssues,
//     <Issue key={0} issueName="" priority="" toggleModal={toggleModal} />,
//   ];
//   return <div className="issues__wrapper">{renderAll}</div>;
// };
export {};
