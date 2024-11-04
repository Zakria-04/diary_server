import { model, Schema } from "mongoose";

const diary_data_schema = new Schema({
  id: Number,
  date: String,
  title: String,
  textArea: String,
});

const user_schema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userPass: {
    type: String,
    required: true,
  },
  userDiaryData: {
    type: [diary_data_schema],
    default: [],
  },
});

const USER_MODEL = model("diary_db", user_schema);
export default USER_MODEL