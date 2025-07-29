import { JwtPayload } from 'jsonwebtoken';
import { Student } from '../../student/repository/schema/student.schema';
import { IAttendance } from '../interface/attendance.interface';
import { Attendance } from '../repository/schema/attendance.schema';
import AppError from '../../../../errors/AppError';
import httpStatus from 'http-status';

const createAttendance = async (user: JwtPayload, payload: IAttendance) => {
  const { organization } = user;
  const student = await Student.findById(payload?.student);

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }
  let attendanceData: IAttendance;

  attendanceData = {
    organization: organization,
    student: payload?.student,
    class: student?.class,
    session: student?.session,
    department: student.department,
    status: payload?.status,
    date: new Date(),
    group: student?.group,
  };

  const createdAttendance = await Attendance.create(attendanceData);

  return createdAttendance;
};

const getAttendanceByStudent = async (id: string) => {
  const result = await Attendance.find({ student: id });
  return result;
};


export const AttendanceServices = {
  createAttendance,
  getAttendanceByStudent,
};
