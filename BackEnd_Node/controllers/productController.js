const Product = require('../models/product')
const User = require('../models/user')


const createProduct = async (req, res) => {

    try {

        let product = await Product.create(req.body)


        //  Success
        res.status(201).send(product)
    } catch (error) {

        res.status(500).json({ error: 'Not Create Product' })
    }
}


const getProducts = async (req, res) => {
    let products = await Product.findAll({ include: User,where:{UserId:req.body.UserId} })
    res.send(products)
}
const addProduct = async (req, res) => {
    res.render("productAdd");
};



const getProductPage = async (req, res) => {

    let products = await Product.findAll({
        where: {
            UserId: req.body.UserId
        },
        row: true,
    })

    console.log("products:", products)
    res.render("products", { products:products })
}

const deleteProduct = async (req, res)=>{
    let {id}=req.params
    let product=await Product.findByPk(id)
    product.destroy()
    res.redirect("/product/products")
}

const editProduct=async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.render('edit', { product });
    } catch (err) {
        console.error(err);
        res.redirect('/products');
    }
}

// const Update=async(req,res)=>{
//     try {
//         const { title, price, description } = req.body;
//         await Product.findByIdAndUpdate(req.params.id, { name, price, description });
//         res.redirect(`/products/${req.params.id}`);
//     } catch (err) {
//         console.error(err);
//         res.redirect('/products');
//     }
// }



module.exports = {
    createProduct,
    getProducts,
    addProduct,
    getProductPage,
    deleteProduct,
    editProduct
}