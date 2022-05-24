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

const mailoptions={
    from:'deveshsharma70888@gmail.com',
    to:'deveshsharmajagariya@gmail.com',
    subject:'Test node mail',
    text:'I hope this one actually get to you.'
}

transport.sendMail(mailoptions,function(error,info){
    if(error){
        console.log(error);
    }
    else{
        console.log('email has been send',info.response)
    }
})