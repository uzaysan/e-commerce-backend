import FileAdapter from "../adapters/FileAdapter.js";

export const fileController = (req, res) => {
  const { file } = req;
  if (!file.mimetype.startsWith("image")) {
    res.status(400).send("File must be image!");
    return;
  }
  FileAdapter.uploadFile(file.buffer, file.mimetype)
    .then((fileData) => res.send(fileData))
    .catch((err) => res.status(500).send(err));
};
