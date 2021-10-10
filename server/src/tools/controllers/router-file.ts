import fileUpload from "express-fileupload";
import { Router } from "express";
import path from "path";

export const routerFiles = Router();

routerFiles.post("/img", async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  const allFiles = [];
  // accessing the file
  for (const key in req.files) {
    const myFile = req.files[key] as fileUpload.UploadedFile;
    if (myFile.size >= 512000) {
      return res.status(507).send({ msg: "size overlimited" });
    }
    allFiles.push({
      name: myFile.name,
      path: `/img/${myFile.name}`,
    });
    const staticFolder = path.resolve(__dirname, "../../../wwwroot");
    //  mv() method places the file inside public directory
    myFile.mv(`${staticFolder}/img/${myFile.name}`, function (err) {
      if (err) {
        return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response status
      return res.status(200);
    });
  }
  return res.send(allFiles);
});
