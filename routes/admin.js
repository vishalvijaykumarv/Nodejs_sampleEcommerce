var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
// var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"Iphone 11",
      category: 'Mobile',
      description:'This is a good phone',
      image:'https://shop.unicornstore.in/uploads/images/medium/72bde0c8715251b54e9f2505f24bba6f.jpeg'
    },
    {
      name:"Iphone 11",
      category: 'Mobile',
      description:'This is a good phone',
      image:'https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg'
    },
    {
      name:"Iphone 11",
      category: 'Mobile',
      description:'This is a good phone',
      image:'https://boip.in/54694-large_default/apple-iphone-11-128gb-refurbished-very-good.jpg'
    },
    {
      name:"Iphone 11",
      category: 'Mobile',
      description:'This is a good phone',
      image:'https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg'
    }
  ]

  res.render('admin/view-products',{products,admin:true})
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',function(req,res){
  console.log(req.body)
  // console.log(req.files.image)
  productHelpers.addProduct(req.body,(result)=>{
    res.render("admin/add-product")
  })

})

module.exports = router;
