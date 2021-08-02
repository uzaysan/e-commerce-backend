import crypto from "crypto";

export const generateSessionToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, function (err, buffer) {
      if (err) reject(err);
      else resolve(buffer.toString("hex").substring(0, 52));
    });
  });
};
