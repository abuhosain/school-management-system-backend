import { JwtPayload } from 'jsonwebtoken';
import { Teacher } from '../repository/schema/teacher.schema';
import { ITeacher } from '../inteface/tacher.interface';
import { TImageFile } from '../../../../interface/image.interface';
import mongoose from 'mongoose';
import { User } from '../../../global/user/repository/schema/user.schema';

const getSingleTeacher = async (id: string) => {
  const result = await Teacher.findById(id);
  if (!result) {
    throw new Error('Student not found');
  }
  return result;
};

const getAllTeachers = async () => {
  const result = await Teacher.find();
  return result;
};

const getAllTeachersByOrganization = async (organizationId: string) => {
  const result = await Teacher.find({ organization: organizationId });
  return result;
};


export const updateTeacher = async (
  user: JwtPayload,
  data: Partial<ITeacher>,
  file: TImageFile,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateTeacher = await Teacher.findByIdAndUpdate(user?.id, data, {
      new: true,
      session,
    });

    if (!updateTeacher) {
      throw new Error('Teacher not found');
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
      await User.findByIdAndUpdate(user?.id, userUpdateData, {
        new: true,
        session,
      });
    }

    await session.commitTransaction();
    session.endSession();

    return updateTeacher;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const TeacherServices = {
  getSingleTeacher,
  getAllTeachers,
  getAllTeachersByOrganization,
  updateTeacher,
};
