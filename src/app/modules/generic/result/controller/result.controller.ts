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
    message: 'Result created successfully',
    data: student,
  });
});

const getAllResultByOrganization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ResultServices.getAllResultByOrganization(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result retrieved successfully',
    data: result,
  });
});

const getResultByStudent = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ResultServices.getResultByStudent(user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result retrieved successfully',
    data: result,
  });
});

export const ResultController = {
  creteResult,
  getAllResultByOrganization,
  getResultByStudent
};
