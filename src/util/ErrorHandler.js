import Error from "../Error";

export const mongoErrorConverter = (err) => {
  return new Error(err);
};
