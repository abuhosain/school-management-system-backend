import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { DepartmentServices } from '../services/department.services';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createDepartment = catchAsync(async (req, res) => {
  const department = req.body;
  const user = req.user;
  const result = await DepartmentServices.createDepartment(
    user as JwtPayload,
    department,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created succesfully!',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
};