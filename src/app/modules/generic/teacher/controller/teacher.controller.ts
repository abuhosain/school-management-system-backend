import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { TeacherServices } from '../services/teacher.services';
import httpStatus from 'http-status';
import { TImageFile } from '../../../../interface/image.interface';

const getSingleTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const teacher = await TeacherServices.getSingleTeacher(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher retrieved successfully',
    data: teacher,
  });
});

const getAllTeachers = catchAsync(async (req, res) => {
  const student = await TeacherServices.getAllTeachers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher retrieved successfully',
    data: student,
  });
});

const getAllTeacherByOrganization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await TeacherServices.getAllTeachersByOrganization(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher retrieved successfully',
    data: student,
  });
});

const updateTeacher = catchAsync(async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const user = req.user;
  const student = await TeacherServices.updateTeacher(
    user as JwtPayload,
    payload,
    file as TImageFile,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher retrieved successfully',
    data: student,
  });
});

export const TeacherControllers = {
  getSingleTeacher,
  getAllTeachers,
  getAllTeacherByOrganization,
  updateTeacher,
};
