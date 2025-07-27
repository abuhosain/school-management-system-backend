import mongoose from 'mongoose';
import AppError from '../../../../errors/AppError';
import { Admin } from '../../../generic/admin/repository/schema/admin.schema';
import { IOrganization } from '../../../global/organization/interface/organization.interface';
import { Organization } from '../../../global/organization/repository/schema/organization.schema';
import { User } from '../../../global/user/repository/schema/user.schema';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import dayjs from 'dayjs';
import { USER_ROLE } from '../../../global/user/user.constance';

export const createOrganization = async (organization: IOrganization) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existingOrganization = await Organization.findOne(
      {
        $or: [
          { customdomain: organization?.customdomain },
          { subdomain: organization?.subdomain },
          { email: organization?.email },
        ],
      },
      { session },
    );

    if (existingOrganization) {
      throw new AppError(
        httpStatus.FOUND,
        'Organization with this email, subdomain or custom domain already exists',
      );
    }

    // ✅ Determine expire_at based on plan_type
    let expire_at: Date;
    const now = new Date();

    switch (organization.plan_type) {
      case 'monthly':
        expire_at = dayjs(now).add(30, 'day').toDate();
        break;
      case 'yearly':
        expire_at = dayjs(now).add(1, 'year').toDate();
        break;
      case 'lifetime':
        expire_at = dayjs(now).add(100, 'year').toDate();
        break;
      default:
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid plan type');
    }

    // Add expire_at to organization object
    const organizationWithExpiry = {
      ...organization,
      expire_at,
    };

    const password = 'Hosain25';
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email: organization.email,
      password: hashedPassword,
      role: USER_ROLE.admin,
      name: organization.name,
      profilePicture: '',
    };

    // Step 1: Create organization with expire_at
    const createdOrganization = await Organization.create(
      [organizationWithExpiry],
      { session },
    );
    const org = createdOrganization[0];

    // Step 2: Create user
    const createdUser = await User.create([userData], { session });
    const user = createdUser[0];

    // Step 3: Create admin linked to user and organization
    await Admin.create(
      [
        {
          user: user._id,
          organization: org._id,
          name: org.name,
          email: user.email,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return org;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AuthServices = {
  createOrganization,
};
