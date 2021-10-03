export interface FormValues {
  "": string;
  "Your first name": string;
  "Your last name": string;
  "Your Job position": string;
  "Score type": string;
  "Score type (Short)": string;
  Title: string;
  Link: string;
  Priority: "Low" | "Middle" | "Hight";
  "Scrum master as player": string;
  "Changing card in round end": string;
  "Is timer needed": string;
  minutes: string;
  seconds: string;
  "Choose file": string | FileList;
  "Connect as Observer": string;
  ChatMessage: string;
}

// enum FormPriority {
//   low = "Low",
//   middle = "Medium",
//   high = "High",
// }

export interface UploadResponse {
  name: string;
  path: string;
}
