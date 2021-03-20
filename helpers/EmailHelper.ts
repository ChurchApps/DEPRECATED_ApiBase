import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'
import directTransport from 'nodemailer-direct-transport'
import { IEmailPayload } from '.'

export class EmailHelper {
    private static _mailSystem: string = process.env.MAIL_SYSTEM

    public static sendEmail({ from, to, subject, body }: IEmailPayload) {
        return new Promise(async (resolve, reject) => {
            try {
                let transporter: nodemailer.Transporter = nodemailer.createTransport(directTransport({
                    name: 'churchapps.org'
                }));

                if (this._mailSystem === 'SES') {
                    AWS.config.update({ region: 'us-east-2' });
                    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
                    transporter = nodemailer.createTransport({ SES: { ses, aws: AWS } })
                }

                await transporter.sendMail({ from, to, subject, html: body });
                resolve(null);
            } catch (err) {
                reject(err);
            }

        })
    }

}