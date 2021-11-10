import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'
import directTransport from 'nodemailer-direct-transport'
import { EnvironmentBase, IEmailPayload } from '.'

export class EmailHelper {

  public static sendEmail({ from, to, subject, body }: IEmailPayload) {
    return new Promise(async (resolve, reject) => {
      try {
        let transporter: nodemailer.Transporter = nodemailer.createTransport(directTransport({
          name: "churchapps.org"
        }));

        if (EnvironmentBase.mailSystem === 'SES') {
          AWS.config.update({ region: 'us-east-2' });
          const ses = new AWS.SES({ apiVersion: '2010-12-01' });
          transporter = nodemailer.createTransport({ SES: { ses, aws: AWS } })
        }
        if (EnvironmentBase.mailSystem === "SMTP") {
          transporter = nodemailer.createTransport({
            host: EnvironmentBase.smtpHost,
            secure: EnvironmentBase.smtpSecure,
            auth: {
              user: EnvironmentBase.smtpUser,
              pass: EnvironmentBase.smtpPass
            }
          });
        }

        await transporter.sendMail({ from, to, subject, html: body });
        resolve(null);
      } catch (err) {
        reject(err);
      }

    })
  }

}