import { JwtPayload } from 'jsonwebtoken';
import { INotice } from '../interface/notice.interface';
import { TImageFile } from '../../../../interface/image.interface';
import { Notice } from '../repository/schema/notice.schema';

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

export const NoticeServices = {
  createNotice,
};
