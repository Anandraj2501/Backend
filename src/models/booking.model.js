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
const FlightDetails = mongoose.Schema({
    id: { type: String, required: false },
    combination_id: { type: String, required: false },
    airline: { type: String, required: false },
    bags_recheck_required: { type: Boolean, required: false },
    cityCodeFrom: { type: String, required: false },
    cityCodeTo: { type: String, required: false },
    cityFrom: { type: String, required: false },
    cityTo: { type: String, required: false },
    equipment: { type: String, default: null },
    fare_basis: { type: String, required: false },
    fare_category: { type: String, required: false },
    fare_classes: { type: String, required: false },
    flight_no: { type: Number, required: false },
    flyFrom: { type: String, required: false },
    flyTo: { type: String, required: false },
    guarantee: { type: Boolean, required: false },
    local_arrival: { type: Date, required: false },
    local_departure: { type: Date, required: false },
    operating_carrier: { type: String, default: "" },
    operating_flight_no: { type: String, default: "" },
    return: { type: Number, required: false },
    utc_arrival: { type: Date, required: false },
    utc_departure: { type: Date, required: false },
    vehicle_type: { type: String, required: false },
    vi_connection: { type: Boolean, required: false }
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
        flightDetails: [FlightDetails],
        referenceId:{
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

export const bookings = mongoose.model("bookings", bookingSchema);
