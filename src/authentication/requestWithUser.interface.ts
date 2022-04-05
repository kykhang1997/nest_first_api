import {  User } from "src/users/users.schema";

export default interface RequestWithUser extends Request {
    user: User
}
