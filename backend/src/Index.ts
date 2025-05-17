import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import { connectToMongoose } from "./database/config";
import { corsOptions, encodedOptions } from "./utils/options";
import router from "./routers";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded(encodedOptions))
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express with TypeScript Server");
});

app.use("/api/", router);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await connectToMongoose()
});