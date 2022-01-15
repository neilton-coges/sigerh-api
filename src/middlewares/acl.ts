import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { UsuariosRepository } from '../repositories/implementations/UsuariosRepository';

export function is(tipos: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const usuariosRepository = container.resolve(UsuariosRepository);

    const usuario = await usuariosRepository.findById(request.userId);

    if (!usuario) {
      return response.status(400).json({
        message: 'Usuário não encontrado.',
      });
    }

    const isAuthorized = tipos.includes(usuario.tipo);

    if (!isAuthorized) {
      return response.status(401).end();
    }

    return next();
  };
}
