import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import 'dotenv/config.js'
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json())
app.use(cors())


//DB connection
connectDB();

//Api endpoints
app.use("/api/food",foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.get('/',(req,res) => {
    res.send("Api working")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})