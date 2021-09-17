export interface FormValues {
  "": string;
  "Your first name": string;
  "Your last name": string;
  "Your Job position": string;
  "Score type:": string;
  "Score type (Short):": string;
  "Title:": string;
  "Link:": string;
  "Priority:": FormPriority;
}

enum FormPriority {
  low = "low",
  middle = "middle",
  high = "high",
}
