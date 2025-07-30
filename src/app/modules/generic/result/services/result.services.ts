import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { IResult } from '../interface/result.interface';
import { Student } from '../../student/repository/schema/student.schema';
import AppError from '../../../../errors/AppError';
import { Result } from '../repository/schema/result.schema';

const createResult = async (user: JwtPayload, payload: IResult) => {
  const { organization } = user;

  const student = await Student.findById(payload.student);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const totalMarks = payload.results.reduce(
    (sum: number, item: any) => sum + item.marks,
    0,
  );

  const resultData: IResult = {
    student: payload.student,
    organization: organization,

    exam_name: payload.exam_name,
    year: payload.year,

    class: student.class,
    session: student.session,
    group: student?.group,

    results: payload.results,
    total_marks: totalMarks,

    gpa: payload.gpa,
    grade: payload.grade,
    is_passed: payload?.is_passed,
  };

  const createdResult = await Result.create(resultData);
  return createdResult;
};

const getAllResultByOrganization = async (id: string) => {
  const result = await Result.find({ organization: id });
  return result;
};

const getResultByStudent = async (id: string) => {
  const student = await Student.findOne({ user: id });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student Not found');
  }
  const result = await Result.find({ student: student?._id }).populate(
    'student',
  );
  return result;
};

const getPublicResult = async ({
  exam_name,
  class: classNumber,
  session,
  year,
  roll_no,
}: {
  exam_name: string;
  class: number;
  session: number;
  year: number;
  roll_no: number;
}) => {
  

  const result = await Result.findOne({
    roll_no,
    class: classNumber,
    session,
    exam_name,
    year,
  }).populate('student');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Result not found');
  }

  return result;
};

export const ResultServices = {
  createResult,
  getAllResultByOrganization,
  getResultByStudent,
  getPublicResult
};
