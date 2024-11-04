import USER_MODEL from "../API/Models/user.module";

const findUserByID = async (id: string) => {
  try {
    const user = await USER_MODEL.findById(id);
    return user;
  } catch (error) {
    console.error("user was no found", error);
    return null;
  }
};

export default findUserByID;
