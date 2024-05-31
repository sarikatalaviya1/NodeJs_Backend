const {Router}=require("express");
const { createProduct,getProducts, addProduct, getProductPage, deleteProduct, editProduct } = require("../controllers/productController");
const isLogin = require("../middlewares/loginChecker");
const productRoute=Router()

productRoute.post('/',isLogin,createProduct)
productRoute.get('/',isLogin,getProducts)
productRoute.get("/add",isLogin,addProduct)
productRoute.get("/products",isLogin,getProductPage)
productRoute.get("/:id",isLogin,deleteProduct)
productRoute.put("/:id",isLogin,editProduct)
module.exports=productRoute;