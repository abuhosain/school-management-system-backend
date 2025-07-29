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

const getAttendanceByStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceServices.getAttendanceByStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance fetched succesfully!',
    data: result,
  });
});

const getAttendanceByOrganization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceServices.getAttendanceByOrganization(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance fetched succesfully!',
    data: result,
  });
});

const updateAttendance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const payload = req.body;
  const result = await AttendanceServices.updateAttendance(
    user as JwtPayload,
    id,
    payload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance updated succesfully!',
    data: result,
  });
});

export const AttendanceControllers = {
  createAttendance,
  getAttendanceByStudent,
  getAttendanceByOrganization,
  updateAttendance,
};
