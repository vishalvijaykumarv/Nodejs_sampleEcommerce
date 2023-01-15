const { response } = require('express');
var express = require('express');
const productHelpers = require('../helpers/product-helpers');

var router = express.Router();

router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{products,admin:true})
  })
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',function(req,res){
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

router.get('/edit-product/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetailes(req.params.id)
  // console.log(product)
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id, req.body).then(()=>{

    console.log(req.files);
    res.redirect('/admin')
    if(req.files.image){
      let image=req.files.image
      let ID = req.params.id
      image.mv('./public/product-images/'+ID+'.jpg')
      }
    })
})

module.exports = router;
