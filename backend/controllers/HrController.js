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
        const usersWithNextSteps = await Promise.all(usersWithF1Visa.map(async (user) => {
            const userId = user._id;
            // get next step
            const nextStep = await getUserNextStep(userId)
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
                workAuthorizationStart: workAuthorizationStart,
                workAuthorizationEnd: workAuthorizationEnd,
                daysRemaining: daysRemaining,
                nextStep: nextStep
            };
        }));

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

        await Document.findByIdAndUpdate(documentId, { status: status, comment: comment });

        res.status(200).json({ message: "Document updated successfully" });
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getVisaPendingUsers, reviewDocument
};


