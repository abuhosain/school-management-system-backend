import { JwtPayload } from 'jsonwebtoken';
import { IDepartment } from '../interface/department.interface';
import { Department } from '../repository/schema/department.schema';

const createDepartment = async (user: JwtPayload, department: IDepartment) => {
  const { name } = department;
  const { organization } = user;

  const isDepartmentExists = await Department.findOne({
    name,
    organization,
  });

  if (isDepartmentExists) {
    throw new Error('Department already exists');
  }

  const newDepartment = await Department.create({
    name,
    organization,
  });

  return newDepartment;
};

const getAllDepartmentByOrgnazationId = async (id: string) => {
  const result = await Department.findById(id);
  return result;
};

const getAllDepartment = async () => {
  const result = await Department.find();
  return result;
};

const getSingleDepartment = async (id: string) => {
  const result = await Department.findById(id);
  if (!result) {
    throw new Error('Department not found');
  }
  return result;
};

const updateDepartment = async (
  id: string,
  user: JwtPayload,
  data: Partial<IDepartment>,
) => {
  const { organization } = user;
  const updatedDepartment = await Department.findOneAndUpdate(
    { _id: id, organization },
    data,
    { new: true },
  );

  if (!updatedDepartment) {
    throw new Error('Department not found');
  }
  return updatedDepartment;
};

export const DepartmentServices = {
  createDepartment,
  getAllDepartmentByOrgnazationId,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
