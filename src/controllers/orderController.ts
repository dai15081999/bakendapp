import { RequestHandler } from "express";
import OrderSchema from "../schemas/OrderSchema";
import ProductSchema from "../schemas/ProductSchema";

export const getAllorder: RequestHandler = async (req, res, next) => {
  try {
    const orders = await OrderSchema.find({}).populate("customerId", "name email")

    res.status(200).json(orders)
  } catch (error) {
    next(error);
  }
}

export const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    const {status} = req.body
    const {orderId} = req.params

    if(!status || !orderId) {
      throw new Error('status err')
    }
    
    const updatedStatus = await OrderSchema.findByIdAndUpdate(orderId, 
      {status: status}, { new: true })
    res.status(200).json({success: true, updatedStatus})
  } catch (error) {
    next(error)
  }
}

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const { userId, items, phone, address, paymentType, code } = req.body;
      if(items) {
        for(const item of items) {
          const itemsold = await ProductSchema.findById(item._id)
          if(itemsold) {
            const newcount = itemsold.countInStock - item.qty
            const newsold = itemsold.sold + item.qty
           const productsold = await itemsold.updateOne({countInStock: newcount, sold: newsold})
          }
        }
      }
 

    const neworder = await OrderSchema.create({
      customerId: userId,
      items: items,
      phone: phone,
      address: address,
      paymentType: paymentType,
      code: code
    })
    res.status(200).json(neworder)
  } catch (error) {
    next(error);
  }
};

// get order by id

export const getOrderId: RequestHandler = async (req, res, next) => {
  try {

    const order = await OrderSchema.find({customerId: req.params.id})

    res.status(200).json(order)
  } catch (error) {
    next(error);
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  try {

    const order = await OrderSchema.findById(req.params.orderId)
    if(order) {
      await order.remove()
      res.status(200).json({success: true})
    }
   
  } catch (error) {
    next(error);
  }
};