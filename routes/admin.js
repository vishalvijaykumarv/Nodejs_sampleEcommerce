const { response } = require('express');
var express = require('express');
const productHelpers = require('../helpers/product-helpers');
// var productHelper=require('../helpers/product-helpers')

var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{products,admin:true})
  })
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',function(req,res){
  // console.log(req.body)
  // console.log(req.files.image)
  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }
    })
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

// router.get('/delete-product/',(req,res)=>{
//   let proId=req.query.id
//   console.log(proId);
//   console.log(req.query);
// })

module.exports = router;
