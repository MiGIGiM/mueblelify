export interface IUser {
    firstName: String,
    lastName: String,
    email: String,
    favorite: [String],
}

export interface IUserArray {
    data: IUser[]
}