import { RequestHandler } from "express";
import ProductSchema from "../schemas/ProductSchema";
import Jimp from 'jimp'
import path from 'path'

export const addProduct: RequestHandler = async (req, res, next) => {
    try {
       const {name, image, price, description, brand, countInStock} = req.body

       if(!name || !image || !price || !description || !brand || !countInStock) {
           throw new Error("Không được bỏ trống mục nào")
       }
       const buffer = Buffer.from(
        image.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, ''),
        'base64'
        );

        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;

        try {
            const jimResp = await Jimp.read(buffer);
            jimResp
                .resize(450, Jimp.AUTO)
                .write(path.resolve(__dirname,  `../../../public/upload/${imagePath}`));
            
        } catch (err) {
            return res.status(500).json({ message: 'Có lỗi xảy ra' });
        }
       try {
        const productNew = await ProductSchema.create({
            name,
            image: `/upload/${imagePath}`,
            price,
            description,
            brand,
            countInStock
        })
        const savedProduct = await productNew.save()

        res.json({savedProduct, success: true});
       } catch (error) {
           res.status(500).json({ message: 'Something went wrong!' });
       }
    } catch (error) {
        next(error)
    }
}


export const getAllProduct: RequestHandler = async (req, res, next) => {
    try {
        let {page, size}: any = req.query

        const limit = parseInt(size)
        const skip = (page - 1) * size

        if(page==999 || size==999) {
            const allProducts = await ProductSchema.find({})
            res.status(200).json(allProducts)
            return
        }

        const products = await ProductSchema.find({}, {}, {limit: limit, skip: skip})
        
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getall: RequestHandler = async (req, res, next) => {
    try {
        const allProducts = await ProductSchema.find({})
        res.status(200).json(allProducts)
    } catch (error) {
        next(error)
    }
}

export const deleteProductById: RequestHandler = async (req, res, next) => {
    try {
        const { idProduct } = req.query
        await ProductSchema.deleteOne({_id: idProduct})
        res.status(200).json({success: true})
    } catch (error) {
        next(error)
    }
}

export const searchFilterProduct: RequestHandler = async (req, res, next) => {
    try {
        const seachedField = req.query.product
        const searchData = await ProductSchema.find({"name": {$regex: seachedField, $options: '$i'}})
        
        res.status(200).json(searchData)
    } catch (error) {
        next(error)
    }
}

export const detailProduct: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await ProductSchema.findById(id)
        if(product) {
            return res.status(200).json(product)
        }
        res.status(401)
        throw new Error('Có lỗi xảy ra')
    } catch (error) {
        next(error)
    }
}

export const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const {name, brand, description, price, countInStock} = req.body
        if(!name || !brand || !description || !price || !countInStock) {
            throw new Error("Không được bỏ trống mục nào")
        }
        const product = await ProductSchema.findById(req.params.id)
        if(product) {
            product.name = name
            product.price = price
            product.description = description
            product.brand = brand
            product.countInStock = countInStock

            const update = await product.save()
            res.status(200).json(update)
        } else {
            throw new Error('Có lỗi xảy ra')
        }
    } catch (error) {
        next(error)
    }
}