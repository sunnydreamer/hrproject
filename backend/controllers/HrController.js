const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Document = require("../models/documentModel");
const mongoose = require("mongoose");


async function getUserNextStep(userId) {
    const user = await User.findOne(userId);
    if (!user || !user.opt) {
        return "Please contact HR";
    }

    const expectedFields = ["receipt", "ead", "i983", "i20"];

    for (let i = expectedFields.length - 1; i >= 0; i--) {
        const field = expectedFields[i];
        const documentId = user.opt[field];


        if (documentId && mongoose.Types.ObjectId.isValid(documentId)) {
            const document = await Document.findById(documentId);


            if (document) {
                const action = getAction(document.status, i, expectedFields.length);
                const isAllSet = document.status === 'Approved' && i === expectedFields.length - 1
                return {
                    isAllSet: isAllSet,
                    documentStatus: document.status,
                    documentId: document._id,
                    documentLink: document.document,
                    documentName: isAllSet ? null : (document.status === 'Approved' ? expectedFields[i + 1] : field),
                    action: action
                };
            }
        }
    }

    return {
        isAllSet: false,
        documentName: expectedFields[0],
        action: "upload"
    };
}

function getAction(status, currentIndex, totalFields) {
    if (status === 'Pending') {
        return "review";
    } else if (status === 'Rejected') {
        return "upload";
    } else if (status === 'Approved') {
        return currentIndex === totalFields - 1 ? null : "upload";
    }
}

const getVisaPendingUsers = async (req, res) => {
    try {
        const query = {
            isHR: false,
            workAuthorization: 'F1'
        };

        const usersWithF1Visa = await User.find(query)

        const usersWithNextSteps = [];

        // Iterate over each user
        for (const user of usersWithF1Visa) {
            const userId = user._id;

            // Check if the last document i20 is approved 
            if (user.opt && user.opt["i20"]) {
                // Use Mongoose to check the status of the related document
                const optI20Document = await Document.findById(user.opt["i20"]);

                if (optI20Document && optI20Document.status === 'Approved') {
                    // If OPT I20 document exists and its status is Approved, skip this user
                    continue;
                }
            }

            // get next step
            const nextStep = await getUserNextStep(userId);

            // format the return data
            const name = `${user.firstName} ${user.lastName}`;
            const workAuthorization = user.workAuthorization;
            const workAuthorizationStart = user.workAuthorizationStart;
            const workAuthorizationEnd = user.workAuthorizationEnd;
            const now = new Date();
            const differenceInMilliseconds = workAuthorizationEnd - now;
            let daysRemaining = null;
            if (workAuthorizationEnd === null) {
                daysRemaining = "End date is invalid";
            } else if (differenceInMilliseconds < 0) {
                daysRemaining = "Expired";
            } else {
                daysRemaining = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            }

            // Add the user to the array
            usersWithNextSteps.push({
                name: name,
                workAuthorization: workAuthorization,
                nextStep: nextStep,
                workAuthorizationStart: workAuthorizationStart,
                workAuthorizationEnd: workAuthorizationEnd,
                daysRemaining: daysRemaining,
                nextStep: nextStep
            });
        }

        res.status(200).json({
            message: "Retrieve F1 Users successfully",
            data: usersWithNextSteps,
        });
    } catch (error) {
        console.error("Error fetching visa pending users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const reviewDocument = async (req, res) => {
    try {
        const { documentId, status, comment } = req.body;

        // Validate documentId and status
        if (!documentId || !status) {
            return res.status(400).json({ error: "Invalid input data" });
        }

        // Find the document by its ID
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        // update the document
        await Document.findByIdAndUpdate(documentId, { status: status, comment: comment });

        //if approve, change the user onboarding Status

        if (status === 'Approved') {
            // Find the user by their ID
            const user = await User.findById(document.userId);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Update user's onboarding status
            user.onboardingStatus = 'Approved';
            await user.save();
        }


        res.status(200).json({ message: "Document updated successfully" });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllApprovedDocuments = async (docList) => {
    try {
        const approvedDocs = {};
        const expectedFields = ["receipt", "ead", "i983", "i20"]

        for (const field of expectedFields) {
            const docId = docList[field];
            if (!mongoose.Types.ObjectId.isValid(docId)) {
                continue;
            }
            const document = await Document.findById(docId);
            if (document && document.status === "Approved") {
                approvedDocs[field] = document.document;
            }
        }
        return approvedDocs;
    } catch (error) {
        console.error("Error getting all the approved documents:", error);
        throw error;
    }
};

const getAllVisaUsers = async (req, res) => {
    try {
        const query = {
            isHR: false,
            workAuthorization: { $nin: ['citizen', 'green card'] }
        };

        const visaUsers = await User.find(query)
        const usersWithNextSteps = await Promise.all(visaUsers.map(async (user) => {
            const userId = user._id;
            // get next step
            const nextStep = await getUserNextStep(userId)
            // get all approved documents
            const allApprovedDocuments = await getAllApprovedDocuments(user.opt)
            // format the return data
            const name = `${user.firstName} ${user.lastName}`
            const workAuthorization = user.workAuthorization
            const workAuthorizationStart = user.workAuthorizationStart
            const workAuthorizationEnd = user.workAuthorizationEnd
            const now = new Date();
            const differenceInMilliseconds = workAuthorizationEnd - now;
            let daysRemaining = null;
            if (workAuthorizationEnd === null) {
                daysRemaining = "End date is invalid"
            }
            else if (differenceInMilliseconds < 0) {
                daysRemaining = "Expired"
            } else {
                daysRemaining = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
            }

            return {
                name: name,
                workAuthorization: workAuthorization,
                nextStep: nextStep,
                allApprovedDocuments: allApprovedDocuments,
                workAuthorizationStart: workAuthorizationStart,
                workAuthorizationEnd: workAuthorizationEnd,
                daysRemaining: daysRemaining,
                nextStep: nextStep
            };
        }));

        res.status(200).json({
            message: "Retrieve All Visa Users successfully",
            data: usersWithNextSteps,
        });
    } catch (error) {
        console.error("Error fetching visa pending users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getVisaPendingUsers, reviewDocument, getAllVisaUsers
};


