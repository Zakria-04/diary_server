import { model, Schema } from "mongoose";

const getDate = new Date();
const day = getDate.getDate();
const month = getDate.getMonth() + 1;
const year = getDate.getFullYear();

const fullDate = `${day},${month},${year}`;

const diarySchema = new Schema({
  authID: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
    minLength: [10, "title must be at least 10 characters"],
  },

  context: {
    type: String,
    required: true,
    maxLength: [300, "max characters must be 70"],
  },

  timeStamp: {
    type: String,
    default: fullDate,
  },
});

const DIARY_MODEL = model("diary", diarySchema);
export default DIARY_MODEL;
