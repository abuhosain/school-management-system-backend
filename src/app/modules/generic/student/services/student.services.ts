import { JwtPayload } from 'jsonwebtoken';
import { IStudent } from '../interface/student.interface';
import { Student } from '../repository/schema/student.schema';
import { User } from '../../../global/user/repository/schema/user.schema';
import mongoose from 'mongoose';
import { TImageFile } from '../../../../interface/image.interface';

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id);
  if (!result) {
    throw new Error('Student not found');
  }
  return result;
};

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getAllStudentsByOrganization = async (organizationId: string) => {
  const result = await Student.find({ organization: organizationId });
  return result;
};

export const updateStudent = async (
  user: JwtPayload,
  data: Partial<IStudent>,
  file: TImageFile,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedStudent = await Student.findByIdAndUpdate(user?.id, data, {
      new: true,
      session,
    });

    if (!updatedStudent) {
      throw new Error('Student not found');
    }

    // Prepare user update object only with relevant fields
    const userUpdateData: Partial<{
      name: string;
      email: string;
      profilePicture?: string;
    }> = {};

    if (data.name) userUpdateData.name = data.name;
    if (data.email) userUpdateData.email = data.email;
    if (file?.path)
      userUpdateData.profilePicture = file?.path;
 
    if (Object.keys(userUpdateData).length > 0) {
      await User.findByIdAndUpdate(user.id, userUpdateData, {
        new: true,
        session,
      });
    }

    await session.commitTransaction();
    session.endSession();

    return updatedStudent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const StudentService = {
  getSingleStudent,
  getAllStudents,
  getAllStudentsByOrganization,
  updateStudent,
};
