const User = require("../models/userModel");
const Document = require("../models/documentModel")
const mongoose = require('mongoose');


const fs = require("fs")
const { s3, bucketName } = require("../config/aws")



const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if userId is a valid mongo ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid mongo ID" });
        }

        //TODO: check if user id is the same stored in token or user is a hr, only user themselves or hr can get the info

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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
    // check if user exists
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    //get file path and key from req.body 
    const uploadedFile = req.file;
    try {
        // get the aws file location
        const s3Location = await awsS3Upload(uploadedFile.path, uploadedFile.filename);

        // create a document in the document collection
        const newDocument = new Document({
            userId: user._id,
            documentType: 'Receipt',
            document: s3Location,
            status: 'Pending', //default pending
            comment: ''
        });

        await newDocument.save();

        // Add the reference ID to the user opt
        // TODO: need to update the steps
        user.opt.receipt = newDocument._id;
        await user.save();

        res.json({ success: true, message: "successfully update the document" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: 'Error uploading file to S3' });
    }
}


module.exports = { getUserById, createUser, uploadDocuments }
