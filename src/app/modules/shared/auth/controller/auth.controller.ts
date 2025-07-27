import catchAsync from '../../../../utils/catchAsynch';
import sendResponse from '../../../../utils/sendResponse';
import { AuthServices } from '../services/auth.services';
import httpStatus from 'http-status';

const createOrganization = catchAsync(async (req, res) => {
  const organization = req.body;
  const result = await AuthServices.createOrganization(organization);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'School Website created successfully',
    data: result,
  });
});

export const AuthController = {
  createOrganization,
};
