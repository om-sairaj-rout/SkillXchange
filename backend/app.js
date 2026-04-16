// core modules
const express = require("express"); 
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// local modules
const connectToDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const connectionRouter = require("./routes/connection.routes");
const bookingRouter = require("./routes/booking.routes");
const sessionRouter = require("./routes/sessions.routes");
const contactRouter = require("./routes/contact.routes");
const updateSessionStatus = require("./controllers/sessionsControllers/session.scheduler");

connectToDB();
const app = express();

app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", // your frontend URL
        credentials: true, // allow credentials (cookies, authorization headers, etc.)
        }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setInterval(updateSessionStatus, 60 * 1000);

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", connectionRouter);
app.use("/api", bookingRouter);
app.use("/api", sessionRouter);
app.use("/api", contactRouter);

app.listen(process.env.PORT, () => {
  console.log("server started at port :", process.env.PORT);
});
