
import { Types } from "mongoose";

export interface Iuser {
  _id?: Types.ObjectId | string,
  name?: string,
  username?: string,
  email?: string,
  password?: string,
}
