import { ZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsynch';
const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //  validation
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
