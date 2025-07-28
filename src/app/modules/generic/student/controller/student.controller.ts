import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { StudentService } from '../services/student.services';
import httpStatus from 'http-status';
import { TImageFile } from '../../../../interface/image.interface';

const getSingleStuent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await StudentService.getSingleStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: student,
  });
});

const getAllStuent = catchAsync(async (req, res) => {
  const student = await StudentService.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: student,
  });
});

const getAllStuentByOrganization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await StudentService.getAllStudentsByOrganization(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    data: student,
  });
});

const updateStuent = catchAsync(async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const user = req.user;
  const student = await StudentService.updateStudent(
    user as JwtPayload,
    payload,
    file as TImageFile,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    data: student,
  });
});

export const StudentControllers = {
  getSingleStuent,
  getAllStuent,
  getAllStuentByOrganization,
  updateStuent,
};
