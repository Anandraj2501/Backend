import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import booking from "./routes/booking.routes.js";
import payment from "./routes/payment.routes.js";
import user from  "./routes/user.routes.js";

// import cookieParser from "cookie-parser";
dotenv.config({
    path: "./.env"
})

const app = express();

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials: true
    })
);


//Common Middlewares used in every backend.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// app.use(cookieParser());

//Routes
app.use("/api/v1/booking",booking);
app.use("/api/v1/initiatePayment",payment);
app.use("/api/v1/user",user);

export default app;
