import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { CreateUsuarioService } from '../services/usuarios/CreateUsuarioService';
import { UpdateUsuarioService } from '../services/usuarios/UpdateUsuarioService';
import { PaginateUsuarioService } from '../services/usuarios/PaginateUsuarioService';
import { ListUsuarioService } from '../services/usuarios/ListUsuarioService';
import { ShowUsuarioService } from '../services/usuarios/ShowUsuarioService';
import { DestroyUsuarioService } from '../services/usuarios/DestroyUsuarioService';

type IndexRequestQuery = {
  login?: string;
  tipo?: string;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class UsuariosController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      login, tipo, isPaginate, perPage, current,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateUsuarioService = container.resolve(PaginateUsuarioService);

      const page = await paginateUsuarioService.execute({
        login,
        tipo,
        current,
        perPage,
      });

      return response.json(instanceToInstance(page));
    }

    const listUsuarioService = container.resolve(ListUsuarioService);

    const servidores = await listUsuarioService.execute({
      login,
      tipo,
    });

    return response.json(instanceToInstance(servidores));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUsuarioService = container.resolve(ShowUsuarioService);

    const usuario = await showUsuarioService.execute(id);

    return response.json(instanceToInstance(usuario));
  }

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

    return response.json(instanceToInstance(usuario));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { tipo, senha } = request.body;
    const { id } = request.params;

    const updateUsuarioService = container.resolve(UpdateUsuarioService);

    const usuario = await updateUsuarioService.execute({
      id,
      tipo,
      senha,
    });

    return response.json(instanceToInstance(usuario));
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyUsuarioService = container.resolve(DestroyUsuarioService);

    await destroyUsuarioService.execute(id);

    return response.json();
  }
}

export { UsuariosController };
