import nodemailer from 'nodemailer';
import {myEmail, password} from '../config/env'
import MailSchema from '../schemas/MailSchema';


export interface padyloadEmail {
    message: any
    youremail: any
}

export const sendMailService = (payload: padyloadEmail) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail,
            pass: password
        }
    });

    let mailDetails: any = {
        from: payload.youremail,
        to: myEmail,
        subject: 'OTP',
        text: 'Đánh giá',
        html: payload.message
    };
      
    mailTransporter.sendMail(mailDetails,async function(err, data) {
        if(err) {
            console.log(err)
            return false
        } else {
            const {from, subject, text} = mailDetails
            await MailSchema.create({
                from, subject, text
            })
            return true
        }
    });
}

export const forgotPassword = (payload: padyloadEmail) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail,
            pass: password
        }
    });

    let mailDetails: any = {
        from: myEmail,
        to: payload.youremail,
        subject: 'OTP',
        text: 'Quên mật khẩu',
        html: payload.message
    };
      
    mailTransporter.sendMail(mailDetails,async function(err, data) {
        if(err) {
            console.log(err)
            return false
        } else {
            const {from, subject, text} = mailDetails
            await MailSchema.create({
                from, subject, text
            })
            return true
        }
    });
}

