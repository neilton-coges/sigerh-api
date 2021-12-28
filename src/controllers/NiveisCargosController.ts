import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateNivelCargoService } from '../services/niveisCargos/CreateNivelCargoService';
import { DestroyNivelCargoService } from '../services/niveisCargos/DestroyNivelCargoService';
import { ListNivelCargoService } from '../services/niveisCargos/ListNivelCargoService';
import { PaginateNivelCargoService } from '../services/niveisCargos/PaginateNivelCargoService';
import { ShowNivelCargoService } from '../services/niveisCargos/ShowNivelCargoService';
import { UpdateNivelCargoService } from '../services/niveisCargos/UpdateNivelCargoService';

type IndexRequestQuery = {
  codigo?: string;
  descricao?: string;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class NiveisCargosController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      codigo, descricao, isPaginate, perPage, current,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateNivelCargoService = container.resolve(PaginateNivelCargoService);

      const page = await paginateNivelCargoService.execute({
        codigo,
        descricao,
        perPage,
        current,
      });

      return response.json(page);
    }

    const listNivelCargoService = container.resolve(ListNivelCargoService);

    const list = await listNivelCargoService.execute({
      codigo,
      descricao,
    });

    return response.json(list);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showNivelCargoService = container.resolve(ShowNivelCargoService);

    const nivelCargo = await showNivelCargoService.execute(id);

    return response.json(nivelCargo);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { codigo, descricao } = request.body;

    const createNivelCargoService = container.resolve(CreateNivelCargoService);

    const nivelCargo = await createNivelCargoService.execute({
      codigo,
      descricao,
    });

    return response.json(nivelCargo);
  }

  async updated(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { codigo, descricao } = request.body;

    const updateNivelCargoService = container.resolve(UpdateNivelCargoService);

    const nivelCargo = await updateNivelCargoService.execute({
      id,
      codigo,
      descricao,
    });

    return response.json(nivelCargo);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyNivelCargoService = container.resolve(DestroyNivelCargoService);

    await destroyNivelCargoService.execute(id);

    return response.json();
  }
}

export { NiveisCargosController };
