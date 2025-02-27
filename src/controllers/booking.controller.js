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
    const { bookingId, passengerId } = req.params; // Get Booking ID & Passenger ID from URL
    const {passengerDetails,pnr} = req.body; // Updated passenger data

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



export { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById };   