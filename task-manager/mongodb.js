// CURD create read update delete

const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error) {
       return console.log('unable to connect to database!')
    }
  

    const db = client.db(databaseName)
  
    db.collection('users').insertOne({
        name:'Devesh',
        age:20
    }),(error,result)=>{  
        if(error){
            return console.log('Unable to insert user')
        }
        console.log(result.ops)
    }
})
