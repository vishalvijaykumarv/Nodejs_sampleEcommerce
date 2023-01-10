var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const userHelpers=require('../helpers/user-helper')
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelpers.getAllProducts().then((products)=>{
    // console.log(products);
    res.render('user/view-products',{products,user})
  })
});

router.get('/login',(req,res)=>{
  res.render('user/login')
})

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((responce)=>{
    console.log(responce)
    res.redirect('/login')
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((responce)=>{
    if(responce.status){
      req.session.loggedIn=true
      req.session.user=responce.user
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
