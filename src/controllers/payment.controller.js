import { bookings } from "../models/booking.model.js";
import jsSHA from "jssha";

const initiatePayment = async (req, res) => {
    try {
        if (
            !req.body.txnid ||
            !req.body.amount ||
            !req.body.productinfo ||
            !req.body.firstname ||
            !req.body.email ||
            !req.body.udf1
        ) {
            res.status(400).json('Mandatory fields missing');

        } else {
            var pd = req.body;
            var hashString =
                process.env.PAYMENT_KEY + // live or test key
                '|' +
                pd.txnid +
                '|' +
                pd.amount +
                '|' +
                pd.productinfo +
                '|' +
                pd.firstname +
                '|' +
                pd.email +
                '|' +
                pd.udf1 +
                '|' +
                pd.udf2 +
                '|||||||||' +
                process.env.SALT; //live or test salt
            var sha = new jsSHA('SHA-512', 'TEXT'); //encryption taking place
            sha.update(hashString);
            var hash = sha.getHash('HEX'); //hashvalue converted to hexvalue



            const newOrder = new bookings({
                transactionId: pd.txnid,
                bookingId: "testing",
                status: 'pending', // Set status as pending initially
                amount: pd.amount,
                productinfo: pd.productinfo,
                firstname: pd.firstname,
                lastname: "",
                email: pd.email,
                passengers: JSON.parse(pd.udf1), // Parse passengers from JSON string
                travellingDetails: JSON.parse(pd.udf2), // Parse travellingDetails from JSON string
            });

            await newOrder.save();
            res.send({ hash: hash });

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}

const paymentSuccess = async (req, res) => {
    try {
        // Find the order by txnid
        const order = await bookings.findOne({ transactionId: req.body.txnid });
        console.log()
        // If the order exists and the payment status is 'success', update the status to 'paid'
        if (order) {
            await bookings.findOneAndUpdate(
                { transactionId: req.body.txnid },
                { status: 'paid' }
            );
            res.status(200).json({data:"Payment Successfull"});
            
        } else if (!order) {
            res.status(404).send({
                status: 'failure',
                message: `Order with transaction ID: ${req.body.txnid} not found.`,
            });
        } else {
            res.status(400).send({
                status: 'failure',
                message: 'Payment was not successful. Please try again.',
            });
        }
    } catch (err) {
        res.status(500).send('An error occurred while processing the payment');
    }
}

const paymentFailed = async (req,res)=>{
    try {

        // Find the order by txnid
        const order = await bookings.findOne({ transactionId: req.body.txnid });
    
        // If the order exists and the payment status is 'failure', update the status to 'failed'
        if (order && req.body.status === 'failure') {
          await bookings.findOneAndUpdate(
            { transactionId: req.body.txnid },
            { status: 'failed', error_Message: req.body.error || "Payment failed" }, // Mark the payment as failed
            { new: true }
          );
          
    
    
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Success</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; }
                  h1 { color: #FF0000; }
                  p { font-size: 16px; color: #333; }
                  .order-details { margin-top: 20px; }
                  .order-details p { font-weight: bold; }
                  .thank-you { margin-top: 30px; font-size: 18px; color: #4CAF50; }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Payment Failed</h1>
                  <p>Your order has been failed. Below are the details:</p>
                  
                  <div class="order-details">
                    <p><strong>Transaction ID:</strong> ${req.body.txnid}</p>
                    <p><strong>Amount:</strong> ${req.body.amount}</p>
                    <p><strong>Name:</strong> ${req.body.firstname} ${order.lastname}</p>
                  </div>
    
                  <div class="thank-you">
                    <p>Thank you for your purchase! You'll receive a confirmation email shortly.</p>
                  </div>
                </div>
              </body>
            </html>
          `)
        } else if (!order) {
          res.status(404).send({
            status: 'failure',
            message: `Order with transaction ID: ${req.body.txnid} not found.`,
          });
        } else {
          res.status(400).send({
            status: 'failure',
            message: 'Order was not found or payment status does not match.',
          });
        }
      } catch (err) {
        res.status(500).send('An error occurred while processing the payment failure');
      }
}


export { initiatePayment, paymentSuccess, paymentFailed };