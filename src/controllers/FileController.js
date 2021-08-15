import FileAdapter from "../adapters/FileAdapter.js";
import request from "request";

import { S3_BUCKET_NAME, S3_ENDPOINT } from "../../keys.js";

export default class FileController {
  static async uploadFile(req, res) {
    const { file } = req;
    if (!file) throw "no file found!";
    if (!file.mimetype.startsWith("image")) {
      res.status(400).send({ err: "File must be image!" });
      return;
    }
    try {
      const fileData = await FileAdapter.uploadFile(file.buffer, file.mimetype);
      res.send(fileData);
    } catch (err) {
      res.status(500).send({ err: err.toString() });
    }
  }

  static async getFile(req, res) {
    const { params } = req;
    if (!params.filename) throw "filename is required";
    params.filename = params.filename.split("?")[0];
    const splitResult = params.filename.split(".");
    const extension = splitResult[splitResult.length - 1];
    res.contentType(`image/${extension}`);
    const url = `https://${S3_BUCKET_NAME}.${S3_ENDPOINT}/${params.filename}`;
    request.get(url).pipe(res);
  }
}
