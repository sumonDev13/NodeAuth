import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yuvi94raj@gmail.com',
        password: 'sumonDev@13'
    }
});
  

  
  export const sendMail = async function ({to, subject, text, html}){
      let info = await transporter.sendMail({
          from: ' <admin@gmail.com>', // sender address
          to,
          subject,
          text,
          html
        });
      return info;  
  }
  