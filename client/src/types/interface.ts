export interface FormValues {
  "": string;
  "Your first name": string;
  "Your last name": string;
  "Your Job position": string;
  "Score type": string;
  "Score type (Short)": string;
  Title: string;
  Link: string;
  Priority: FormPriority;
  "Scram master as player": string;
  "Changing card in round end": string;
  "Is timer needed": string;
  "Connect as Observer": string;
  minutes: string;
  seconds: string;
}

enum FormPriority {
  low = "low",
  middle = "medium",
  high = "high",
}
