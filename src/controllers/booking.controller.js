import { bookings } from "../models/booking.model.js";
import { hotelBooking } from "../models/hotelbooking.model.js";

const getBookingData = async(req,res)=>{
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

const getBookingDataById = async(req,res)=>{
    
    try{   
        const {id} = req.params;
        const order = await bookings.findOne({ transactionId: id });;

        if(!order){
            res.status(404).json({message: "Ticket not found"});
        }else{
            res.status(200).json(order);
        }

    }catch(error){
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const getHotelBookingDataById = async(req,res)=>{
    
    try{   
        const {id} = req.params;
        const order = await hotelBooking.findOne({ transactionId: id });;

        if(!order){
            res.status(404).json({message: "Ticket not found"});
        }else{
            res.status(200).json(order);
        }

    }catch(error){
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const updateBookingData = async (req, res) => {
    const { id } = req.params; // Booking ID from URL parameter
    const { passengerDetails, pnr } = req.body; // Destructure passengerDetails and pnr from request body

    try {
        // Find the booking by ID
        const order = await bookings.findById(id);

        if (!order) {
            return res.status(404).send({ message: "Booking not found" });
        }

        // Update the PNR if provided
        if (pnr) {
            order.pnr = pnr;
        }

        // Update passengers if provided
        if (passengerDetails && Array.isArray(passengerDetails)) {
            passengerDetails.forEach((updatedPassenger) => {
                const existingPassenger = order.passengers.find(
                    (passenger) => passenger._id.toString() === updatedPassenger._id
                );

                if (existingPassenger) {
                    // Update existing passenger fields
                    existingPassenger.title = updatedPassenger.title || existingPassenger.title;
                    existingPassenger.firstName = updatedPassenger.firstName || existingPassenger.firstName;
                    existingPassenger.lastName = updatedPassenger.lastName || existingPassenger.lastName;
                    existingPassenger.nationality = updatedPassenger.nationality || existingPassenger.nationality;
                }
            });
        }

        // Save the updated booking
        const updatedOrder = await order.save();

        res.status(200).send({ message: "Booking updated successfully", updatedOrder });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
};


export { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById };   