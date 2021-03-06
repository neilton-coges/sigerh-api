import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCargoService } from '../services/cargos/CreateCargoService';
import { DestroyCargoService } from '../services/cargos/DestroyCargoService';
import { ListCargoService } from '../services/cargos/ListCargoService';
import { PaginateCargoService } from '../services/cargos/PaginateCargoService';
import { ShowCargoService } from '../services/cargos/ShowCargoService';
import { UpdateCargoService } from '../services/cargos/UpdateCargoService';

type IndexRequestQuery = {
  tipo?: string;
  descricao?: string;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class CargosController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      tipo, descricao, isPaginate, perPage, current,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateCargoService = container.resolve(PaginateCargoService);

      const page = await paginateCargoService.execute({
        tipo,
        descricao,
        current,
        perPage,
      });

      return response.json(page);
    }
    const listCargoService = container.resolve(ListCargoService);

    const cargos = await listCargoService.execute({
      descricao,
    });

    return response.json(cargos);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCargoService = container.resolve(ShowCargoService);

    const cargo = await showCargoService.execute(id);

    return response.json(cargo);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { tipo, descricao, nivelCargoId } = request.body;

    const createCargoService = container.resolve(CreateCargoService);

    const cargo = await createCargoService.execute({ tipo, descricao, nivelCargoId });

    return response.status(201).json(cargo);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { tipo, descricao, nivelCargoId } = request.body;
    const { id } = request.params;

    const updateCargoService = container.resolve(UpdateCargoService);

    const cargo = await updateCargoService.execute({
      id,
      tipo,
      descricao,
      nivelCargoId,
    });

    return response.json(cargo);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyCargoService = container.resolve(DestroyCargoService);

    await destroyCargoService.execute(id);

    return response.json();
  }
}

export { CargosController };
