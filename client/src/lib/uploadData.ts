import { UploadResponse } from "../types/interface";
import { BASE_SERVER } from "../api";

export const uploadData = async (
  data: FormData
): Promise<Array<UploadResponse>> => {
  try {
    const response = await fetch(`${BASE_SERVER}/upload/img`, {
      method: "POST",
      body: data,
    });
    const result = (await response.json()) as Array<UploadResponse>;
    return result;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
