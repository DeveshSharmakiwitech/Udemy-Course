const jwt = require('jsonwebtoken')
const User = require('../db/models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)                 // verify token
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })      // find user data
        console.log("decoded id ",decoded._id)

        // if (!user) {
        //     throw new Error()
        // }
        
        // add user from payload
        // req.token=token
        req.user =  decoded._id
        next()
    } catch (e) {
        console.log('auth err  ',e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth

