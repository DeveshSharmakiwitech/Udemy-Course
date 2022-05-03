var nodemailer=require('nodemailer');
var transport=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
    user:'devesh.sharma@kiwitech.com',
    pass:'Kiwi@2018'
    }
})
var mailOption={
    from:'devesh.char778@kiwitech.com',
    to:'deveshsharmajagariya@gmail.com',
    subject:'Test node mail',
    text:'Hello please sub.channel'
}
transport.sendMail(mailOption,function(error,info)
{
    if(error)
    {
        console.warn(error);
    }
    else{
        console.warn('email has been sent',info.response);
        }
})