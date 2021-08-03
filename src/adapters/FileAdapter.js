import AWS from "aws-sdk";
import {
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  S3_ENDPOINT,
} from "../../keys.js";
import { generateFileName } from "../util/FileUtil.js";

const s3Storage = new AWS.S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  endpoint: S3_ENDPOINT,
});

export default class FileAdapter {
  static async uploadFile(fileData, mimeType) {
    return await new Promise((resolve, reject) => {
      const filename = `${generateFileName()}.${mimeType.split("/")[1]}`;
      const file = {
        Bucket: S3_BUCKET_NAME,
        Key: filename,
        Body: fileData,
      };
      s3Storage.upload(file, function (err, data) {
        if (err) reject(err);
        else resolve({ url: data.Location });
      });
    });
  }

  static async deleteFile(fileName) {
    return await new Promise((resolve, reject) => {
      const params = {
        Key: fileName,
      };
      s3Storage.deleteObject(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
}
