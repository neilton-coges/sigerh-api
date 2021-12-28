import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateReajusteClasseNivelCargoService } from '../services/niveisCargos/CreateReajusteClasseNivelCargoService';
import { DestroyReajusteClasseNivelCargoService } from '../services/niveisCargos/DestroyReajusteClasseNivelCargoService';
import { ListReajusteClasseNivelCargoService } from '../services/niveisCargos/ListReajusteClasseNivelCargoService';

class ReajustesClassesNiveisCargosController {
  async index(request: Request, response: Response): Promise<Response> {
    const { classeNivelCargoId } = request.params;

    const listReajusteClasseNivelCargoService = container.resolve(
      ListReajusteClasseNivelCargoService,
    );

    const reajustes = await listReajusteClasseNivelCargoService.execute(
      classeNivelCargoId,
    );

    return response.json(reajustes);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { classeNivelCargoId } = request.params;
    const { percentual, observacao } = request.body;

    const createReajusteClasseNivelCargoService = container.resolve(
      CreateReajusteClasseNivelCargoService,
    );

    const reajuste = await createReajusteClasseNivelCargoService.execute({
      percentual,
      observacao,
      classeNivelCargoId,
    });

    return response.status(201).json(reajuste);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyReajusteClasseNivelCargoService = container.resolve(
      DestroyReajusteClasseNivelCargoService,
    );

    await destroyReajusteClasseNivelCargoService.execute(id);

    return response.json();
  }
}

export { ReajustesClassesNiveisCargosController };
