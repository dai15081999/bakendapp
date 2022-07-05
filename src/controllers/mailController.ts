import { RequestHandler } from "express";
import { sendMailService } from "../functions/mail";
import MailSchema from "../schemas/MailSchema";

export const checkmail: RequestHandler = async (req, res, next) => {
    try {
        const {youremail, message} = req.body
        if(!youremail || !message) throw new Error('Không được bỏ trống mục nào')
        await sendMailService({youremail, message})
       
        res.status(200).json({success: true})
    } catch (error) {   
        next(error)
    }
}


export const getmail: RequestHandler = async (req, res, next) => {
    try {
        const mail = await MailSchema.find({})
        if(!mail) throw new Error('co loi xay ra')
        res.status(200).json(mail)
    } catch (error) {   
        next(error)
    }
}