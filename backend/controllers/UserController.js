const User = require("../models/userModel");
const Document = require("../models/documentModel")
const mongoose = require('mongoose');


const fs = require("fs")
const { s3, bucketName } = require("../config/aws")


const getDocuments = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // return if they are not F1
        if (user.workAuthorization !== 'F1') {
            return res.status(200).json({ message: 'User does not have F1(dOPT) work authorization', data: null });
        }

        // checking their required documents and get data from Document Collection
        const expectedFields = ['receipt', 'ead', 'i983', 'i20'];
        const documentInfo = {};

        for (const field of expectedFields) {
            if (user.opt && user.opt[field] && mongoose.Types.ObjectId.isValid(user.opt[field])) {
                const document = await Document.findById(user.opt[field]);
                if (document) {
                    documentInfo[field] = {
                        documentType: document.documentType,
                        status: document.status,
                        comment: document.comment
                    };
                    continue;
                }
            }
            documentInfo[field] = null;
        }

        res.status(200).json({ message: 'Retrieve OPT documents successfully', data: documentInfo });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const awsS3Upload = async (filePath, newFileNameKey) => {
    // send file to AWS S3
    try {
        const fileStream = fs.createReadStream(filePath);
        const params = {
            Bucket: bucketName,
            Key: newFileNameKey,
            Body: fileStream
        };
        const data = await s3.upload(params).promise();
        console.log('Success:', data.Location);

        //return the AWS file location
        return data.Location;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }


}

const uploadDocuments = async (req, res) => {
    const { userId } = req.params;
    const { documentType } = req.body;

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    //get file from req.file 
    const uploadedFile = req.file;
    try {
        // send to aws and get the aws file location
        const s3Location = await awsS3Upload(uploadedFile.path, uploadedFile.filename);

        // create a document in the document collection
        const newDocument = new Document({
            userId: user._id,
            documentType: documentType,
            document: s3Location,
            status: 'Pending', //default is pending
            comment: ''
        });
        await newDocument.save();

        // add the reference ID to the user opt
        user.opt[documentType] = newDocument._id;
        await user.save();

        res.json({ success: true, message: "successfully update the document" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: 'Error uploading file to S3' });
    }
}


module.exports = { getUserById, createUser, uploadDocuments, getDocuments }
