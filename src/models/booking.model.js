import mongoose from "mongoose";

const PassengerSchema = mongoose.Schema({
    title: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationality: { type: String, required: false , default: "Indian" },
});
const TravellingDetailsSchema = mongoose.Schema({
    from: { type: String, required: true }, // Departure location
    to: { type: String, required: true },   // Arrival location
    departureDate: { type: Date, required: true }, // Departure date
    returnDate: { type: Date }, // Optional return date for round-trip
    tripType: { type: String, enum: ['one Way', 'Round Trip'], required: true }, // Trip type
});
const bookingSchema = mongoose.Schema(
    {
        transactionId: { type: String, required: true },
        bookingId: {type: String, required: true,},
        status:{ type: String, required: true },
        amount: { type: String, required: true },
        productinfo: { type: String },
        firstname: { type: String },
        email: { type: String },
        lastname: { type: String },
        pnr:{type:String,required:false},
        passengers: [PassengerSchema],
        travellingDetails: TravellingDetailsSchema,
        referenceId:{
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

export const bookings = mongoose.model("bookings", bookingSchema);
