import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { ListServidorLotacaoService } from '../services/servidores/ListServidorLotacaoService';
import { UpdateServidorLotacaoService } from '../services/servidores/UpdateServidorLotacaoService';

class ServidoresLotacoesController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      matricula,
      dataAdmissao,
      observacao,
      jornadaId,
      subUnidadeId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
    } = request.body;

    const updateServidorLotacaoService = container.resolve(UpdateServidorLotacaoService);

    const lotacao = await updateServidorLotacaoService.execute({
      id,
      matricula,
      dataAdmissao,
      observacao,
      jornadaId,
      subUnidadeId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
    });

    return response.json(lotacao);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { servidorId } = request.params;

    const listServidorLotacaoService = container.resolve(ListServidorLotacaoService);

    const lotacao = await listServidorLotacaoService.execute(servidorId);

    return response.json(instanceToInstance(lotacao));
  }
}

export { ServidoresLotacoesController };
