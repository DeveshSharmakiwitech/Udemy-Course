const jwt = require('jsonwebtoken')
const User = require('../db/models/user')
const fs = require('fs')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, process.env.JWT_SECRET)       // verify token

        //Token verify by fs
        const fileToken = await fs.readFileSync(decoded._id+'.txt',{encoding: 'utf-8'}, function(err, data) {    
        if (!err) {
            return data
        } else{

        }
        });
        // console.log("fileToken => ", fileToken)
        // console.log("decoded id ",decoded._id)
        if(fileToken == token){
            console.log('token is match!')
        }else{
            console.log('token is not matched!')
            return res.status(401).send({ error: 'Please authenticate.' })

        }
        
        //Token verify by db
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })      // find user data
        // if (!user) {
        //     throw new Error()
        // }
        
        // add user from payload
        // req.token=token


        req.user =  decoded._id
        next()
    } catch (e) {
        // console.log('auth err  ',e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth

