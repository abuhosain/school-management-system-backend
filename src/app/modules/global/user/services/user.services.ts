import mongoose from 'mongoose';
import AppError from '../../../../errors/AppError';
import { IStudent } from '../../../generic/student/interface/student.interface';
import { User } from '../repository/schema/user.schema';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user.constance';
import bcrypt from 'bcrypt';
import { Student } from '../../../generic/student/repository/schema/student.schema';
import { TImageFile } from '../../../../interface/image.interface';
import { JwtPayload } from 'jsonwebtoken';
import { ITeacher } from '../../../generic/teacher/inteface/tacher.interface';
import { Teacher } from '../../../generic/teacher/repository/schema/teacher.schema';

const createStudent = async (
  user: JwtPayload,
  studentData: IStudent,
  file: TImageFile,
) => {
  const session = await mongoose.startSession();
  const { organization } = user;
  try {
    session.startTransaction();

    const isExistingStudent = await User.isUserExistsByEmail(studentData.email);
    if (isExistingStudent) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Student with this email already exists',
      );
    }

    const password = studentData?.email;
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email: studentData.email,
      password: hashedPassword,
      role: USER_ROLE.student,
      name: studentData.name,
      profilePicture: file?.path,
      organization: organization,
    };

    const user = await User.create([userData], { session });

    const student = await Student.create(
      [
        {
          ...studentData,
          user: user[0]._id,
          profilePicture: file?.path,
          organization: organization,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return student[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createTeacher = async (
  user: JwtPayload,
  teacherData: ITeacher,
  file: TImageFile,
) => {
  const session = await mongoose.startSession();
  const { organization } = user;
  try {
    session.startTransaction();

    const isExistingTeacher = await User.isUserExistsByEmail(
      teacherData?.email,
    );
    if (isExistingTeacher) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Teacher with this email already exists',
      );
    }

    const password = teacherData?.email;
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email: teacherData.email,
      password: hashedPassword,
      role: USER_ROLE.student,
      name: teacherData.name,
      profilePicture: file?.path,
      organization: organization,
    };

    const user = await User.create([userData], { session });

    const teacher = await Teacher.create(
      [
        {
          ...teacherData,
          user: user[0]._id,
          profilePicture: file?.path,
          organization: organization,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return teacher[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserServices = {
  createStudent,
  createTeacher,
};
