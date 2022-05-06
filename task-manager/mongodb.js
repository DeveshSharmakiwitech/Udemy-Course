// CURD create read update delete

const { toByteArray } = require('base64-js')
const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const objectID=mongodb.ObjectID

// const { MongoClient, objectID}= require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

const id=  objectID();

MongoClient.connect(connectionURL,{ useNewUrlParser:true},(error,client)=>{
    if(error) {
       return console.log('unable to connect to database!')
    }
  

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age:18
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('task').deleteOne({
        description:"clean tne house"
    }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
    
  
})
