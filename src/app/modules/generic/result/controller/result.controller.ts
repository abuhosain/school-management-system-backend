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

const getPublicResult = catchAsync(async (req, res) => {
  const { exam_name, class: classNumber, session, year, roll_no } = req.query;
  const result = await ResultServices.getPublicResult({
    exam_name: exam_name as string,
    class: Number(classNumber),
    session: Number(session),
    year: Number(year),
    roll_no: Number(roll_no),
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result fetched successfully',
    data: result,
  });
});

const updateResult = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const payload = req.body;
  const result = await ResultServices.updateResult(
    user as JwtPayload,
    id,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result Updated successfully',
    data: result,
  });
});

export const ResultController = {
  creteResult,
  getAllResultByOrganization,
  getResultByStudent,
  getPublicResult,
  updateResult,
};
