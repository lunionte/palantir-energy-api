import express from "express";
import dotenv from "dotenv";
import { authRoute } from "./routes/auth.route";
import { userRoute } from "./routes/user.route";
import { errors } from "celebrate";
import { errorHandler } from "./middlewares/error-handler.middleware";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use(errors());

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
