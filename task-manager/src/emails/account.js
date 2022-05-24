const nodemailer= require('nodemailer')

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

// Note:- Please click this usl first to run the program for 'Less security app access'

const sendWelcomeEmail=(email,name)=>{
    const mailoptions={
        from:'devesh.sharma@kiwitech.com',
        to:email,
        subject:'Thanks for joining!',
        text:`Welcome to the app, ${name}. Let me know how to get along with the app.`
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

const sendCancelationEmail=(email,name)=>{
    const mailoptions={
        from:'devesh.sharma@kiwitech.com',
        to:email,
        subject:'Sorry to see you go!',
        text:`Goodbye, ${name}. I hope to see you back sometime soon.`
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

module.exports={sendWelcomeEmail,sendCancelationEmail}