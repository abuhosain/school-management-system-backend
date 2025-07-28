import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { StudentService } from '../services/student.services';
import httpStatus from 'http-status';

const getSingleStuent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await StudentService.getSingleStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: null,
  });
});

const getAllStuent = catchAsync(async (req, res) => {
  const student = await StudentService.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: null,
  });
});

export const StudentControllers = {
  getSingleStuent,
  getAllStuent,
};
