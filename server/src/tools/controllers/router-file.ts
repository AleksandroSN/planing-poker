import fileUpload from "express-fileupload";
import { Router } from "express";
import path from "path";

export const routerFiles = Router();

routerFiles.post("/img", async (req, res) => {
  console.log(req);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.file as fileUpload.UploadedFile;
  const staticFolder = path.resolve(__dirname, "../../../wwwroot");
  //  mv() method places the file inside public directory
  myFile.mv(`${staticFolder}/img/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({
      name: myFile.name,
      path: `/img/${myFile.name}`,
    });
  });
});
