import { default as express, Request, Response } from "express";
import { json } from "body-parser";

const app = express();
const port = 3000;

// Middleware to parse our payload as `application/json`
app.use(json());

type Checkin = {
  name: string;
  group: string;
  slogan: string;
};

namespace CheckedInStudents {
  const checkedIn: Checkin[] = [];

  export const saveCheckin = (checkin: Checkin) => {
    checkedIn.push(checkin);
  };

  export const getCheckedIn = () => checkedIn;
}

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello, you're origin url is ${req.originalUrl}!`);
});

app.post("/course/checkin", (req: Request, res: Response) => {
  if (req.body && req.body.name && req.body.group && req.body.slogan) {
    const { name, group, slogan } = req.body;
    CheckedInStudents.saveCheckin({ name, group, slogan });
    res.send({ status: "you're checked in!" });
  } else {
    res.status(400);
    res.send({ status: "missing parameters or wrong parameters. Try again!" });
  }
});

app.get("/courses/checkin/all", (_: Request, res: Response) => {
  res.send(CheckedInStudents.getCheckedIn());
});

app.listen(port, () => {
  console.log(`API started on port ${port}`);
});
