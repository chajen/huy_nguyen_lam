import express, { Request, Response } from "express";
import { Problem4 } from "./problem4";
import resourcekRoutes from "./problem5/resource-routers";

const app = express();
const port = process.env.PORT || 3200;
app.use(express.json());

app.use("/problem5", resourcekRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.get("/problem4/:n", (req: Request, res: Response) => {
  const { n } = req.params;
  if (!Number.isInteger(Number(n))) res.send("Please input valid number");
  res.send(
    "Hello, this's result: a " +
      Problem4.sum_to_n_a(Number(n)) +
      " | b: " +
      Problem4.sum_to_n_b(Number(n)) +
      " | c: " +
      Problem4.sum_to_n_c(Number(n))
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
