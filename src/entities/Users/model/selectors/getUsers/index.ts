import { StateSchema } from "@/app/providers/StoreProvider";

export const getUsers = (state: StateSchema) => state.users.users
