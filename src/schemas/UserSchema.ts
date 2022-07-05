import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    avatar: string,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    block: boolean
}

const UserSchema: Schema = new Schema({
    avatar: {
      type: String,
      required: false,
      default: 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
     password: {
         type: String,
         required: true
     },
     isAdmin: {
         type: Boolean,
         default: false
     },
     block: {
        type: Boolean,
        default: false
     }
}, {timestamps: true})

export default model<IUser>("User", UserSchema);