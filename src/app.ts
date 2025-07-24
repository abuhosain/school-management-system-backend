import express, { Application, Request, Response } from "express";
import cors from "cors";
import cockieParser from "cookie-parser";

const app: Application = express();

// parser
app.use(express.json());
app.use(cockieParser());

const allowedOrigins = ["http://localhost:3000"]; // Production frontend
app.use(cors({ origin: allowedOrigins, credentials: true }));

// application routes
// app.use('/api', router)

// Test route
app.get("/", async (req: Request, res: Response) => {
  const message = "School Management Server is running";
  res.send(message);
});

// global error handler
// app.use(globalErrorHandler);

// not found route
// app.use(notFound);

export default app;
