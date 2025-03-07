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
    id: { type: String, required: true },
    combination_id: { type: String, required: true },
    airline: { type: String, required: true },
    bags_recheck_required: { type: Boolean, required: true },
    cityCodeFrom: { type: String, required: true },
    cityCodeTo: { type: String, required: true },
    cityFrom: { type: String, required: true },
    cityTo: { type: String, required: true },
    equipment: { type: String, default: null },
    fare_basis: { type: String, required: true },
    fare_category: { type: String, required: true },
    fare_classes: { type: String, required: true },
    flight_no: { type: Number, required: true },
    flyFrom: { type: String, required: true },
    flyTo: { type: String, required: true },
    guarantee: { type: Boolean, required: true },
    local_arrival: { type: Date, required: true },
    local_departure: { type: Date, required: true },
    operating_carrier: { type: String, default: "" },
    operating_flight_no: { type: String, default: "" },
    return: { type: Number, required: true },
    utc_arrival: { type: Date, required: true },
    utc_departure: { type: Date, required: true },
    vehicle_type: { type: String, required: true },
    vi_connection: { type: Boolean, required: true }
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
