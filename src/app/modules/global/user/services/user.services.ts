import mongoose from 'mongoose';
import AppError from '../../../../errors/AppError';
import { IStudent } from '../../../generic/student/interface/student.interface';
import { User } from '../repository/schema/user.schema';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user.constance';
import bcrypt from 'bcrypt';
import { Student } from '../../../generic/student/repository/schema/student.schema';
import { TImageFile } from '../../../../interface/image.interface';

const createStudent = async (studentData: IStudent, file: TImageFile) => {
  const session = await mongoose.startSession();

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
    };

    const user = await User.create([userData], { session });

    const student = await Student.create(
      [
        {
          ...studentData,
          user: user[0]._id,
          profilePicture: file.path,
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

export const UserServices = {
  createStudent,
};
