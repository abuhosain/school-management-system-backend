import { JwtPayload } from 'jsonwebtoken';
import { IDepartment } from '../interface/department.interface';
import { USER_ROLE } from '../../../global/user/user.constance';
import { Admin } from '../../admin/repository/schema/admin.schema';
import { Teacher } from '../../teacher/repository/schema/teacher.schema';
import { Department } from '../repository/schema/department.schema';

const createDepartment = async (user: JwtPayload, department: IDepartment) => {
  const { name } = department;
  const { id, role } = user;
  let organization;
  if (role == USER_ROLE.admin) {
    const admin = await Admin.findById(id);
    organization = admin?.organization;
  }
  if (role == USER_ROLE.teacher) {
    const teacher = await Teacher.findById(id);
    organization = teacher?.organization;
  }

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

export const DepartmentServices = {
  createDepartment,
  getAllDepartmentByOrgnazationId,
};
