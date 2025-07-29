import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../utils/catchAsynch';
import { NoticeServices } from '../services/notice.services';
import { TImageFile } from '../../../../interface/image.interface';
import sendResponse from '../../../../utils/sendResponse';

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
    statusCode: 200,
    success: true,
    message: 'Notice created successfully',
    data: result,
  });
});

export const NoticeController = {
  createNotice,
};
