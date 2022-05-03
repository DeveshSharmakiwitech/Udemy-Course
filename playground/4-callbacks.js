setTimeout(() => {
    console.log("Two second are up!");
}, 2000);

const add=(a,b,callback)=> {
    setTimeout(()=>
    {
        callback(a+b);
    },3000)
}

add(1,4,(sum)=>
{
    console.log(sum)
})