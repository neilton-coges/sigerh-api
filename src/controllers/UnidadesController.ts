import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUnidadeService } from '../services/unidades/CreateUnidadeService';
import { DestroyUnidadeService } from '../services/unidades/DestroyUnidadeService';
import { ListUnidadeService } from '../services/unidades/ListUnidadeService';
import { PaginateUnidadeService } from '../services/unidades/PaginateUnidadeService';
import { ShowUnidadeService } from '../services/unidades/ShowUnidadeService';
import { UpdateUnidadeService } from '../services/unidades/UpdateUnidadeService';

type IndexRequestQuery = {
  sigla?: string;
  nome?: string;
  isPaginate?: boolean;
  perPage?: number;
  current?: number;
}

class UnidadesController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      sigla, nome, isPaginate, perPage, current,
    } = request.query as IndexRequestQuery;

    if (isPaginate) {
      const paginateUnidadeService = container.resolve(PaginateUnidadeService);
      const page = await paginateUnidadeService.execute({
        sigla,
        nome,
        perPage,
        current,
      });

      return response.json(page);
    }

    const listUnidadeService = container.resolve(ListUnidadeService);
    const data = await listUnidadeService.execute({
      sigla,
      nome,
    });

    return response.json(data);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUnidadeService = container.resolve(ShowUnidadeService);

    const unidade = await showUnidadeService.execute(id);

    return response.json(unidade);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { sigla, nome, unidadePaiId } = request.body;

    const createUnidadeService = container.resolve(CreateUnidadeService);

    const unidade = await createUnidadeService.execute({
      sigla,
      nome,
      unidadePaiId,
    });

    return response.status(201).json(unidade);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { sigla, nome } = request.body;

    const updateUnidadeService = container.resolve(UpdateUnidadeService);

    const unidade = await updateUnidadeService.execute({
      id,
      sigla,
      nome,
    });

    return response.json(unidade);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyUnidadeService = container.resolve(DestroyUnidadeService);

    await destroyUnidadeService.execute(id);

    return response.json();
  }
}

export { UnidadesController };
