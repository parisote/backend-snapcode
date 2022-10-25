const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config();

class S3 {
    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME;
        this.region = process.env.AWS_BUCKET_REGION;
        this.accessKeyId = process.env.AWS_ACCESS_KEY;
        this.secretAccessKey = process.env.AWS_SECRET_KEY;
        this.s3 = new AWS.S3({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
        })
    }

    uploadFile = async (filename) => {
        const fileStream = fs.createReadStream(`uploads/${filename}`)

        const uploadParams = {
            Bucket: this.bucketName,
            Body: fileStream,
            Key: filename,
        }

        return this.s3.upload(uploadParams).promise()
    }


    getFileStream = async (fileKey) => {
        const downloadParams = {
            Key: fileKey,
            Bucket: this.bucketName
        }

        const file = await this.s3.getObject(downloadParams).promise()

        return file.Body.toString('base64');
    }

    removeFile = async (fileKey) => {
        const deleteParams = {
            Key: fileKey,
            Bucket: this.bucketName
        }
        return this.s3.deleteObject(deleteParams).promise()
    }
}

module.exports = S3
