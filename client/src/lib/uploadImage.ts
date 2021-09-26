import { UploadResponse } from "../types/interface";
import { BASE } from "./baseHost";

export const uploadData = async (
  data: FormData
): Promise<Array<UploadResponse>> => {
  try {
    const response = await fetch(`${BASE}/upload/img`, {
      method: "POST",
      body: data,
    });
    const result = (await response.json()) as Array<UploadResponse>;
    return result;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
