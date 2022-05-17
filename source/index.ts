import express, { Express, request, Request, Response } from "express";
import initialTransactions from "./data/initialTransactions";
import postTransactions from "./data/postTransactions";
import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

interface Valid {
  transactionId: Number;
  date: Number;
  to: Number;
  from: Number;
  currency: String;
  value: Number;
  description: String;
}

const totaltransactions: Valid[] = initialTransactions;

app.get("/transactions", (req: Request, res: Response) => {
  return res.status(200).json({
    transactions: totaltransactions,
  });
});

app.post("/transactions", (req: Request, res: Response) => {
  const isValid = (obj: any): obj is Valid => {
    return (
      typeof obj.transactionId === "number" &&
      typeof obj.date === "number" &&
      typeof obj.to === "number" &&
      typeof obj.from === "number" &&
      typeof obj.currency === "string" &&
      typeof obj.value === "number" &&
      typeof obj.description === "string"
    );
  };

  if (!isValid(req.body)) {
    return res.status(201).json({
      error: "Object is not valid",
    });
  }
  totaltransactions.push(req.body);
  return res.status(200).json({
    transactions: totaltransactions,
  });
});

app.use((req, res: Response, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
