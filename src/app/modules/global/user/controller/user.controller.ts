import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { UserServices } from '../services/user.services';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req, res) => {
  const user = req.user;
  const organization = req.body;
  const file: any = req.file;
  const result = await UserServices.createStudent(user as JwtPayload, organization, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
