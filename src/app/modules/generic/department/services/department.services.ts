import { JwtPayload } from 'jsonwebtoken';
import { IDepartment } from '../interface/department.interface';
import { USER_ROLE } from '../../../global/user/user.constance';
import { Admin } from '../../admin/repository/schema/admin.schema';
import { Teacher } from '../../teacher/repository/schema/teacher.schema';
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

export const DepartmentServices = {
  createDepartment,
  getAllDepartmentByOrgnazationId,
  getAllDepartment,
  getSingleDepartment,
};
