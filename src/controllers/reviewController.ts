import { RequestHandler } from "express";
import ReviewSchema from "../schemas/reviewSchema";
import ProductSchema from "../schemas/ProductSchema";

export const reviewspost: RequestHandler = async (req, res, next) => {
  try {
    const { productid } = req.params;
    const { start, review, name } = req.body;
    if (!start || !review || !name) {
      throw Error("Không được bỏ trống mục nào");
    }
    const checkProduct = await ProductSchema.findById(productid);
    if (!checkProduct) {
      throw Error("Id error");
    }
    const createReview = await ReviewSchema.create({
      productId: checkProduct._id,
      name,
      start,
      review
    })
    res.status(201).json(createReview);
  } catch (error) {
    next(error);
  }
};

export const getreview: RequestHandler = async (req, res, next) => {
  try {
    const { productid } = req.params;
    const checkReview = await ReviewSchema.find({ productId: productid })

    if(!checkReview) {
        throw Error('Lỗi xảy ra')
    }

    res.status(200).json(checkReview)
  } catch (error) {
    next(error);
  }
};
