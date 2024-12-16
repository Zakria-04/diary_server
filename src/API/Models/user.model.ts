import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "UserName must be at least 3 characters long"],
    maxLength: [20, "Username cannot be more than 20 characters"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^[a-z]+$/.test(value);
      },
      message: "Username must only contain lowercase letters (a-z).",
    },
  },

  userPass: {
    type: String,
    require: true,
    minLength: [7, "Password must be at least 7 characters"],
  },

  email: {
    type: String,
    unique: true,
    default: "",
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
});

const USER_MODEL = model("diary_user", userSchema);

export default USER_MODEL;
