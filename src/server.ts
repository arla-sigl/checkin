import { default as express, Request, Response } from "express";
import { json } from "body-parser";

const app = express();
const port = 3000;

// Middleware to parse our payload as `application/json`
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello, you're origin url is ${req.originalUrl}!`);
});

app.post("/course/checkin", (req: Request, res: Response) => {
  console.log("body is: ", req.body);
  if (req.body && req.body.name && req.body.group && req.body.slogan) {
    res.send({ status: "inscrit!" });
  } else {
    res.status(400);
    res.send({ status: "missing parameters or wrong parameters. Try again!" });
  }
});

app.listen(port, () => {
  console.log(`API started on port ${port}`);
});
