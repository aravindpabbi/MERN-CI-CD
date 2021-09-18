const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const product = require("../models/product")
const { sortBy } = require("lodash")
const category = require("../models/category")

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: `Unable to find the product by ${id}`
      })
    }
    req.product = product;
    next()
  })
}

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image"
      })
    }


    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please Include all fields"
      })
    }

    let product = new Product(fields)
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size to big"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type

      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt failed"
          })
        }
        res.json(product)
      })
    }
  })
}

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product)
}

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next()
}

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      res.status(400).json({
        error: `Failed to delete the ${product.name}`
      })
    }
    res.json({
      message: `Deleted the product ${product.name}`
    })
  })
}

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image"
      })
    }


    let product = req.product;
    product = _.extend(product, fields)

    
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "updation of product failed"
          })
        }
        res.json(product)
      })
    
  })
}

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product Found"
        })
      }
      res.json(products)
    })
}


exports.getAllUniqueCategories = (req,res) => {
  Product.distinct("category",{},(err,categories)=>{
    if (err) {
      return res.status(400).json({
        error: "No category is found"
      })
    }
    res.json(categories)
  })
}

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod=>{
    return  {
      updateOne: {
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count,sold: +prod.count}}
      }
    }
  })
  Product.bulkWrite(myOperations,{},(err,products)=>{
    if(err) {
      return res.status(400).json({
        error: "Bulk operations failed"
      })
    }
    next()
  })
}
