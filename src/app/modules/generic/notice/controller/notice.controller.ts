import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import { NoticeServices } from '../services/notice.services';
import { TImageFile } from '../../../../interface/image.interface';
import sendResponse from '../../../../utils/sendResponse';
import httpStatus from 'http-status';

const createNotice = catchAsync(async (req, res) => {
  const { user } = req;
  const { file } = req;
  const payload = req.body;

  const result = await NoticeServices.createNotice(
    user as JwtPayload,
    payload,
    file as TImageFile,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice created successfully',
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NoticeServices.getSingleNotice(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice retrieved successfully',
    data: result,
  });
});

const getNoticeByOrgnization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NoticeServices.getNoticeByOrganization(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice retrieved successfully',
    data: result,
  });
});

const updateNotice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const file = req.file;
  const payload = req.body;
  const result = await NoticeServices.updateNotice(
    user as JwtPayload,
    id,
    payload,
    file as TImageFile
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice updaated successfully',
    data: result,
  });
});

export const NoticeController = {
  createNotice,
  getSingleNotice,
  getNoticeByOrgnization,
  updateNotice,
};
