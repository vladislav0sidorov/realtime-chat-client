import { IUser } from "@/entities/User/model/types/user";

export interface IUsersSchema {
  users: IUser['user'][],
  errors?: string | []
}
