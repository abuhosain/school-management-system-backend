import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import { AttendanceServices } from '../services/attendance.services';
import sendResponse from '../../../../utils/sendResponse';
import httpStatus from 'http-status';

const createAttendance = catchAsync(async (req, res) => {
  const attendance = req.body;
  const user = req.user;
  const result = await AttendanceServices.createAttendance(
    user as JwtPayload,
    attendance,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance created succesfully!',
    data: result,
  });
});

export const AttendanceControllers = {
  createAttendance,
};
