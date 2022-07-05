import { Router } from "express";
import {
  getAllProduct,
  detailProduct,
  searchFilterProduct,
  deleteProductById,
  updateProduct,
  addProduct,
  getall
} from "../controllers/prodController";
import { admin_middleware , auth_middleware} from "../middlewares/auth_middleware";


const router = Router();

router.get("/product/getproducts", getAllProduct);
router.get("/product/getall", getall);
router.post("/product", addProduct);
router.get("/product/:id", detailProduct);
router.get(`/product`, searchFilterProduct);
router.put('/product/:id', updateProduct)
router.delete(`/product`, deleteProductById);

export default router;
