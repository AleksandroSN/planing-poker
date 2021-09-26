import { FormValues, UploadResponse } from "../types/interface";
import { CreateNewFile } from "./createFormData";

export const uploadImage = async (
  data: FormValues
): Promise<UploadResponse | null> => {
  const files = data["Choose file"] as FileList;
  if (files.length > 0) {
    const file = files[0];
    const fileName = files[0].name;
    const res = await CreateNewFile(file, fileName);
    const firstImage = res[0];
    return firstImage;
  }
  return null;
};
