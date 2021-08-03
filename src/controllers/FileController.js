import FileAdapter from "../adapters/FileAdapter.js";
import request from "request";

import { S3_BUCKET_NAME, S3_ENDPOINT } from "../../keys.js";

export const uploadFile = (req, res) => {
  const { file } = req;
  if (!file.mimetype.startsWith("image")) {
    res.status(400).send("File must be image!");
    return;
  }
  FileAdapter.uploadFile(file.buffer, file.mimetype)
    .then((fileData) => res.send(fileData))
    .catch((err) => res.status(500).send(err));
};

export const getFile = (req, res) => {
  const { params } = req;
  if (!params.filename) throw "filename is required";
  params.filename = params.filename.split("?")[0];
  const splitResult = params.filename.split(".");
  const extension = splitResult[splitResult.length - 1];
  res.contentType(`image/${extension}`);
  const url = `https://${S3_BUCKET_NAME}.${S3_ENDPOINT}/${params.filename}`;
  request.get(url).pipe(res);
};
