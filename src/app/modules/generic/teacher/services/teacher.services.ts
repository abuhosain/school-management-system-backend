import { Teacher } from '../repository/schema/teacher.schema';

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

export const TeacherServices = {
  getSingleTeacher,
  getAllTeachers,
};
