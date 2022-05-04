import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { ListProgressaoService } from '../services/progressoes/ListProgresssaoService';
import { CreateProgressaoService } from '../services/progressoes/CreateProgressaoService';
import { PaginateProgressaoService } from '../services/progressoes/PaginateProgressaoService';
import { ShowProgressaoService } from '../services/progressoes/ShowProgressaoService';

type IndexRequestQuery = {
  servidorId?: string;
  dataProgressaoInicio?: Date;
  dataProgressaoFim?: Date;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class ProgressoesController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      servidorId,
      dataProgressaoInicio,
      dataProgressaoFim,
      isPaginate,
      current,
      perPage,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateProgressaoService = container.resolve(PaginateProgressaoService);

      const page = await paginateProgressaoService.execute({
        servidorId,
        dataProgressaoInicio,
        dataProgressaoFim,
        current,
        perPage,
      });

      return response.json(instanceToInstance(page));
    }

    const listProgressaoService = container.resolve(ListProgressaoService);

    const list = await listProgressaoService.execute({
      servidorId,
      dataProgressaoInicio,
      dataProgressaoFim,
    });

    return response.json(instanceToInstance(list));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProgressaoService = container.resolve(ShowProgressaoService);

    const progressao = await showProgressaoService.execute(id);

    return response.json(instanceToInstance(progressao));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      servidorId,
      cargoId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
      dataProgressao,
      processo,
      observacao,
    } = request.body;

    const createProgressaoService = container.resolve(CreateProgressaoService);

    const progressao = await createProgressaoService.execute({
      servidorId,
      cargoId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
      dataProgressao,
      processo,
      observacao,
    });

    return response.status(201).json(progressao);
  }
}

export { ProgressoesController };
