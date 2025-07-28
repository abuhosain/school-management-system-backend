import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { TeacherServices } from '../services/teacher.services';
import httpStatus from 'http-status';

const getSingleTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const teacher = await TeacherServices.getSingleTeacher(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: teacher,
  });
});

export const TeacherControllers = {
  getSingleTeacher,
};
