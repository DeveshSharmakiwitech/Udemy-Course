const path = require('path')
const nodemailer= require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport=nodemailer.createTransport({
    host :'smtp.gmail.com',
    port:465,
    secure:true,
    requireTLS:true,
    auth:{
        user:'devesh.sharma@kiwitech.com',
        pass:'Kiwi@2018'
    }
});

transport.use('compile',hbs({
    viewEngine:{
        extname:".handlebars",
        partialsDir: path.resolve('./views'),
        defaultLayout:false,
    },
    viewPath: path.resolve('./views'),
    extName:".handlebars",
}));

// Note:- Please click this usl first to run the program for 'Less security app access'

const sendWelcomeEmail=(email,name)=>{
    const mailoptions1={
        from:'devesh.sharma@kiwitech.com',
        to:email,
        subject:'Thanks for joining!',
        text:`Welcome to the app, ${name}. Let me know how to get along with the app.`,
        attachments:[
            {
                filename:'profile-pic.jpg', path:'./src/emails/images/profile-pic.jpg',
                cid:'pp'
            },
            {
                filename:'sample-doc-file.doc', path:'./src/emails/images/sample-doc-file.doc',
            }
        ],
        template:'index'
    }

 

    transport.sendMail(mailoptions1,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('email has been send',info.response)
        }
    })
   
}

const sendCancelationEmail=(email,name)=>{
    const transport=nodemailer.createTransport({
        host :'smtp.gmail.com',
        port:465,
        secure:true,
        requireTLS:true,
        auth:{
            user:'devesh.sharma@kiwitech.com',
            pass:'Kiwi@2018'
        }
    });

    const mailoptions2={
        from:'devesh.sharma@kiwitech.com',
        to:email,
        subject:'Sorry to see you go!',
        text:`Goodbye, ${name}. I hope to see you back sometime soon.`
    }

    transport.sendMail(mailoptions2,function(error,info){
        if(error){
            console.log('hi '+error);
        }
        else{
            console.log('email has been send',info.response)
        }
    })
}

const forgotPasswordEmail = (email,token)=>{
    const mailoptions = {
        from : 'devesh.sharma@kiwitech.com',
        to:email,
        subject:'Reset Password',
        html:`<h2>Please click on given link to reset your password</h2>
                <p>${process.env.Client_URL}/resetpassword/${token}</p>`
    }

    transport.sendMail(mailoptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('email has been send',info.response)
        }
    })
}

module.exports={sendWelcomeEmail,sendCancelationEmail,forgotPasswordEmail}