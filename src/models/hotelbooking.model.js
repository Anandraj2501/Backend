import mongoose, { Schema } from "mongoose";


const PassengerSchema = mongoose.Schema({
    title: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const hotelbooking = new Schema({
    transactionId: {
        type: String, required: true
    },
    city: {
        type: String,
        required: true
    },
    checkinDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    travellers: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: false
    },
    contactDetails: {
        phone: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    passengers: [PassengerSchema]
},
    { timestamps: true }
)

export const hotelBooking = mongoose.model("hotelBooking", hotelbooking);