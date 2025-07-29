import { JwtPayload } from 'jsonwebtoken';
import { INotice } from '../interface/notice.interface';
import { TImageFile } from '../../../../interface/image.interface';
import { Notice } from '../repository/schema/notice.schema';
import AppError from '../../../../errors/AppError';
import httpStatus from 'http-status';

const createNotice = async (
  user: JwtPayload,
  payloaad: INotice,
  file: TImageFile,
) => {
  const { organization } = user;
  const noticeData = {
    ...payloaad,
    organization: organization,
    image: file?.path,
  };

  const result = await Notice.create(noticeData);
  return result;
};

const getSingleNotice = async (id: string) => {
  const result = await Notice.findById(id).populate('organization');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Notice not found');
  }
  return result;
};

const getNoticeByOrganization = async (id: string) => {
  const result = await Notice.find({ organization: id });
  return result;
};

const updateNotice = async (
  user: JwtPayload,
  id: string,
  payload: INotice,
  file: TImageFile,
) => {
  const { organization } = user;
  let updatedPayload = payload;

  if (file?.path) {
    updatedPayload = {
      ...payload,
      image: file.path,
    };
  }

  const update = await Notice.findOneAndUpdate(
    { _id: id, organization },
    updatedPayload,
    { new: true },
  );

  if (!update) {
    throw new AppError(httpStatus.NOT_FOUND, 'Notice not found');
  }

  return update;
};

export const NoticeServices = {
  createNotice,
  getSingleNotice,
  getNoticeByOrganization,
  updateNotice,
};
