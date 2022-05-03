//object property shorthand

// const name='Andrew';
// const userage=27;

// const user={
//     name,
//     age:userage,
//     location:'philadelphia'
// }

// console.log(user);

// object destructuring

const product ={
    lebel:'red notebook',
    price:3,
    stock:201,
    saleprice:undefined,
    rating:4.2
}

// const lable=product.lebel
// const stock=product.stock
// console.log(lable)

// const {lable:productlabel,stock,rating=5} =product
// console.log(productlabel)
// console.log(stock)
// console.log(rating)

const transation=(type,{label,stock})=>{
    console.log(type, label, stock)
}
transation('order',product)