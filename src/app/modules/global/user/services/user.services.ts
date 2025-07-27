import { email } from 'zod';
import AppError from '../../../../errors/AppError';
import { IStudent } from '../../../generic/student/interface/student.interface';
import { User } from '../repository/schema/user.schema';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user.constance';
import bcrypt from 'bcrypt';
import { Student } from '../../../generic/student/repository/schema/student.schema';
import { TImageFile } from '../../../../interface/image.interface';

const createStudent = async (studentData: IStudent, file: TImageFile) => {
  const isExistingStudent = await User.isUserExistsByEmail(studentData.email);
  if (isExistingStudent) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student with this email already exists',
    );
  }
  const password = studentData.roll_no.toString();
  const hashedPassword = await bcrypt.hash(password, 12);
  const userData = {
    email: studentData.email,
    password: hashedPassword,
    role: USER_ROLE.student,
  };

  const user = await User.create(userData);

  const student = await Student.create({
    ...studentData,
    user: user._id,
    profilePicture: file.path,
  });

  return student;
};

export const UserServices = {
  createStudent,
};
