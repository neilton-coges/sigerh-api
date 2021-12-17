import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCdsFgService } from '../services/cdsFgs/CreateCdsFgService';
import { DestroyCdsFgService } from '../services/cdsFgs/DestroyCdsFgService';
import { ListCdsFgService } from '../services/cdsFgs/ListCdsFgService';
import { PaginateCdsFgService } from '../services/cdsFgs/PaginateCdsFgService';
import { ShowCdsFgService } from '../services/cdsFgs/ShowCdsFgService';
import { UpdateCdsFgService } from '../services/cdsFgs/UpdateCdsFgService';

type IndexRequestQuery = {
  tipo?: 'CDS' | 'FG',
  simbologia?: string;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class CdsFgsController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      tipo, simbologia, current, perPage, isPaginate = false,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateCdsFgService = container.resolve(PaginateCdsFgService);
      const page = await paginateCdsFgService.execute({
        tipo,
        simbologia,
        current,
        perPage,
      });

      return response.json(page);
    }
    const listCdsFgService = container.resolve(ListCdsFgService);
    const list = await listCdsFgService.execute({
      tipo,
      simbologia,
    });

    return response.json(list);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCdsFgService = container.resolve(ShowCdsFgService);

    const cdsFg = await showCdsFgService.execute(id);

    return response.json(cdsFg);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      tipo, simbologia, remuneracao, quantidadeVagas,
    } = request.body;

    const createCdsFgService = container.resolve(CreateCdsFgService);

    const cdsFg = await createCdsFgService.execute({
      tipo,
      simbologia,
      remuneracao,
      quantidadeVagas,
    });

    return response.status(201).json(cdsFg);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      tipo,
      simbologia,
      remuneracao,
      quantidadeVagas,
    } = request.body;

    const updateCdsFgService = container.resolve(UpdateCdsFgService);

    const cdsFg = await updateCdsFgService.execute({
      id,
      tipo,
      simbologia,
      remuneracao,
      quantidadeVagas,
    });

    return response.json(cdsFg);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyCdsFgService = container.resolve(DestroyCdsFgService);

    await destroyCdsFgService.execute(id);

    return response.json();
  }
}

export { CdsFgsController };
