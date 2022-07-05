import { Schema, model, Document } from 'mongoose'

export interface IMail extends Document {
   from: string
   subject: string
   text: string
}

const MailSchema: Schema = new Schema({
    from: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default model<IMail>("Mail", MailSchema);