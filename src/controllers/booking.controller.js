import { bookings } from "../models/booking.model.js";
import { hotelBooking } from "../models/hotelbooking.model.js";

const getBookingData = async (req, res) => {
    try {
        // Fetch all tickets from the bookings collection
        const orders = await bookings.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No tickets found.' });
        }

        // Send the list of tickets as a JSON response
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching tickets.' });
    }
};

const getBookingDataById = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;
        const order = await bookings.findOne({ transactionId: id });;
        console.log(order)
        if (!order) {
            res.status(404).json({ message: "Ticket not found" });
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const getHotelBookingData = async (req, res) => {
    try {
        // Fetch all tickets from the bookings collection
        const orders = await hotelBooking.find();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No tickets found.' });
        }

        // Send the list of tickets as a JSON response
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching tickets.' });
    }
};

const getHotelBookingDataById = async (req, res) => {

    try {
        const { id } = req.params;
        const order = await hotelBooking.findOne({ transactionId: id });;

        if (!order) {
            res.status(404).json({ message: "Ticket not found" });
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const updateBookingData = async (req, res) => {
    const { bookingId, passengerId } = req.params; // Get Booking ID & Passenger ID from URL
    const { passengerDetails, pnr } = req.body; // Updated passenger data

    try {
        const updatedBooking = await bookings.findOneAndUpdate(
            { _id: bookingId, "passengers._id": passengerId }, // Match booking & passenger ID
            {
                $set: {
                    "passengers.$.title": passengerDetails.title,
                    "passengers.$.firstName": passengerDetails.firstName,
                    "passengers.$.lastName": passengerDetails.lastName,
                    "passengers.$.nationality": passengerDetails.nationality
                }
            },
            { new: true } // Return updated document
        );

        if (!updatedBooking) {

            return res.status(404).send({ message: "Passenger not found" });
        }
        console.log(updatedBooking);
        res.status(200).send({ message: "Passenger updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
};

const updateHotelBookingData = async (req, res) => {
    const { bookingId, passengerId } = req.params; // Get Booking ID & Passenger ID from URL
    const { passengerDetails } = req.body; // Updated passenger data

    try {
        const updatedBooking = await hotelBooking.findOneAndUpdate(
            { _id: bookingId, "passengers._id": passengerId }, // Match booking & passenger ID
            {
                $set: {
                    "passengers.$.title": passengerDetails.title,
                    "passengers.$.firstName": passengerDetails.firstName,
                    "passengers.$.lastName": passengerDetails.lastName,
                }
            },
            { new: true } // Return updated document
        );

        if (!updatedBooking) {

            return res.status(404).send({ message: "Passenger not found" });
        }
        console.log(updatedBooking);
        res.status(200).send({ message: "Passenger updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
};

const getStats = async (req, res) => {
    let totalHotelBooking;
    let hotelBookingLastThirtyDays;
    let totalFlightBooking;
    let flightbookingLastThirtyDays;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        // Count total bookings
        totalHotelBooking = await hotelBooking.countDocuments();
        totalFlightBooking = await bookings.countDocuments();

        // Count bookings from the last 30 days (Fixed missing `await`)
        hotelBookingLastThirtyDays = await hotelBooking.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        flightbookingLastThirtyDays = await bookings.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

        const stats = {
            totalHotelBooking,
            hotelBookingLastThirtyDays,
            totalFlightBooking,
            flightbookingLastThirtyDays,
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById, getHotelBookingData, updateHotelBookingData, getStats };   