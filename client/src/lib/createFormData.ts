import { UploadResponse } from "../types/interface";
import { uploadData } from "./uploadData";

export const CreateNewFile = async (
  file: string | Blob,
  fileName: string
): Promise<Array<UploadResponse>> => {
  const fileUpload = new FormData();
  fileUpload.append("file", file);
  fileUpload.append("fileName", fileName);
  const res = await uploadData(fileUpload);
  return res;
};