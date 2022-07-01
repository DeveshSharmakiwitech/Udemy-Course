const fs = require('fs')
fs.writeFile('users.json','{}',(err)=>{
    console.log('file created')
})
let datares = fs.readFileSync('users.json');
let data = JSON.parse(datares); 
var arr = data.array 
const new_thing = {id: id_string, data: data_string}

arr.push(new_thing)

var new_Js = {
  non_array: "HELLO WORLD",
  array: arr
}
let string_js = JSON.stringify(new_Js);
  fs.writeFileSync('file.json', string_js, "UTF-8",{'flags': 'a'});
