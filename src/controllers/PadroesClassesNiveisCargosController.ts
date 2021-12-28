import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePadraoClasseNivelCargoService } from '../services/niveisCargos/CreatePadraoClasseNivelCargoService';
import { DestroyPadraoClasseNivelCargoService } from '../services/niveisCargos/DestroyPadraoClasseNivelCargoService';
import { ListPadraoClasseNivelCargoService } from '../services/niveisCargos/ListPadraoClasseNivelCargoService';
import { ShowPadraoClasseNivelCargoService } from '../services/niveisCargos/ShowPadraoClasseNivelCargoService';
import { UpdatePadraoClasseNivelCargoService } from '../services/niveisCargos/UpdatePadraoClasseNivelCargoService';

class PadroesClassesNiveisCargosController {
  async index(request: Request, response: Response): Promise<Response> {
    const { classeNivelCargoId } = request.params;

    const listPadraoClasseNivelCargoService = container.resolve(
      ListPadraoClasseNivelCargoService,
    );

    const list = await listPadraoClasseNivelCargoService.execute(classeNivelCargoId);

    return response.json(list);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPadraoClasseNivelCargoService = container.resolve(
      ShowPadraoClasseNivelCargoService,
    );

    const padraoClasseNivelCargo = await showPadraoClasseNivelCargoService.execute(
      id,
    );

    return response.json(padraoClasseNivelCargo);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { classeNivelCargoId } = request.params;
    const { codigo, descricao, valor } = request.body;

    const createPadraoClasseNivelCargoService = container.resolve(
      CreatePadraoClasseNivelCargoService,
    );

    const padraoClasseNivelCargo = await createPadraoClasseNivelCargoService.execute({
      codigo,
      descricao,
      valor,
      classeNivelCargoId,
    });

    return response.status(201).json(padraoClasseNivelCargo);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { codigo, descricao } = request.body;

    const updatePadraoClasseNivelCargo = container.resolve(
      UpdatePadraoClasseNivelCargoService,
    );

    const padraoClasseNivelCargo = await updatePadraoClasseNivelCargo.execute({
      id,
      codigo,
      descricao,
    });

    return response.json(padraoClasseNivelCargo);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyPadraoClasseNivelCargo = container.resolve(
      DestroyPadraoClasseNivelCargoService,
    );

    await destroyPadraoClasseNivelCargo.execute(id);

    return response.json();
  }
}

export { PadroesClassesNiveisCargosController };
