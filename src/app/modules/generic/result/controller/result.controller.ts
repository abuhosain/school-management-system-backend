import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import { ResultServices } from '../services/result.services';
import sendResponse from '../../../../utils/sendResponse';
import httpStatus from 'http-status';

const creteResult = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const student = await ResultServices.createResult(
    user as JwtPayload,
    payload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    data: student,
  });
});

export const ResultController = {
  creteResult,
};
