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

const updateResult = async (
  user: JwtPayload,
  resultId: string,
  payload: Partial<IResult>,
) => {
  const { organization } = user;

  const existingResult = await Result.findOne({
    _id: resultId,
    organization,
  });

  if (!existingResult) {
    throw new AppError(httpStatus.NOT_FOUND, 'Result not found');
  }

  const student = await Student.findById(existingResult.student);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const totalMarks = payload.results
    ? payload.results.reduce((sum: number, item: any) => sum + item.marks, 0)
    : existingResult.total_marks;

  const updatedData: Partial<IResult> = {
    exam_name: payload.exam_name || existingResult.exam_name,
    year: payload.year || existingResult.year,
    class: student.class,
    session: student.session,
    group: student.group,
    results: payload.results || existingResult.results,
    total_marks: totalMarks,
    gpa: payload.gpa || existingResult.gpa,
    grade: payload.grade || existingResult.grade,
    is_passed: payload.is_passed ?? existingResult.is_passed,
  };

  const updatedResult = await Result.findByIdAndUpdate(resultId, updatedData, {
    new: true,
  });

  return updatedResult;
};

export const ResultServices = {
  createResult,
  getAllResultByOrganization,
  getResultByStudent,
  getPublicResult,
  updateResult,
};
