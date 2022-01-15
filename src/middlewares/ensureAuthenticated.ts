import { NextFunction, Request, Response } from 'express';
import { verify, decode } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(401).json({
      message: 'Token is missing.',
    });
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    verify(token, JWT_SECRET);

    const { sub } = decode(token);

    request.userId = sub.toString();

    return next();
  } catch {
    return response.status(401).json({
      message: 'Token is invalid.',
    });
  }
}
