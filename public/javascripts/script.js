function addToCart(proID){
    $.ajax({
        url:'/add-to-cart/'+proID,
        method:'get',
        success:(response)=>{
            alert(response)
            // if(response.status){
            //     let count=$('#cart-count').html()
            //     count=parseInt(count)+1
            //     $("#cart-count").html(count)
            // }
            // alert(response)
        }
    })
}