import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToMongoose } from "./database/config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express with TypeScript Server");
});

app.use(express.json())
app.use(express.urlencoded())

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await connectToMongoose()
});