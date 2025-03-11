import { ObjectId } from 'mongodb';
interface IUser {

    _id?: ObjectId;

    email: string;

    password: string;

    fullName: string;

    profilePicture: string;

    createdAt: Date;

    updatedAt: Date;

}


export default IUser;