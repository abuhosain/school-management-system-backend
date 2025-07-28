import { Student } from '../repository/schema/student.schema';

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

export const StudentService = {
  getSingleStudent,
  getAllStudents,
  getAllStudentsByOrganization,
};
