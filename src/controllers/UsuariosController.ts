import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUsuarioService } from '../services/usuarios/CreateUsuarioService';

class UsuariosController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      login, senha, tipo, servidorId,
    } = request.body;

    const createUsuarioService = container.resolve(CreateUsuarioService);

    const usuario = await createUsuarioService.execute({
      login,
      senha,
      tipo,
      servidorId,
    });

    usuario.senha = '';

    return response.json(usuario);
  }
}

export { UsuariosController };
