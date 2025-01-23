import express from "express"
import cors from "cors"

import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import movieRouter from "./routes/movies.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page")
});

app.use("/api/movies", movieRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});