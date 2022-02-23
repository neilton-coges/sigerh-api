import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { ShowNomeacaoService } from '../services/nomeacoes/ShowNomeacaoService';
import { CreateNomeacaoService } from '../services/nomeacoes/CreateNomeacaoService';
import { PaginateNomeacaoService } from '../services/nomeacoes/PaginateNomeacaoService';

type IndexRequestQuery = {
  tipo?: string;
  nomeServidor?: string;
  perPage?: number;
  current?: number;
}

class NomeacoesController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      tipo, nomeServidor, perPage, current,
    } = request.query as IndexRequestQuery;

    const paginateNomeacaoService = container.resolve(PaginateNomeacaoService);

    const page = await paginateNomeacaoService.execute({
      tipo,
      nomeServidor,
      current,
      perPage,
    });

    return response.json(page);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showNomeacaoService = container.resolve(ShowNomeacaoService);

    const nomeacao = await showNomeacaoService.execute(id);

    return response.json(instanceToInstance(nomeacao));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      tipo, cargoId, cdsFgId, unidadeId, servidorId, data, diofProcesso, observacao,
    } = request.body;

    const createNomeacaoService = container.resolve(CreateNomeacaoService);

    const nomeacao = await createNomeacaoService.execute({
      tipo,
      cargoId,
      cdsFgId,
      unidadeId,
      servidorId,
      data,
      diofProcesso,
      observacao,
    });

    return response.status(201).json(nomeacao);
  }
}

export { NomeacoesController };
