import * as dotenv from 'dotenv';

dotenv.config();

export const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  secretRefreshToken: process.env.REFRESH_TOKEN_SECRET,
  expireInRefreshToken: process.env.REFRESH_TOKEN_EXPIRES_IN,
  expireInRefreshTokenDays: process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS,
};
