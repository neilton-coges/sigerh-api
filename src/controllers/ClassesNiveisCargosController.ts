import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClasseNivelCargoService } from '../services/niveisCargos/CreateClasseNivelCargoService';
import { DestroyClasseNivelCargoService } from '../services/niveisCargos/DestroyClasseNivelCargoService';
import { ListClasseNivelCargoService } from '../services/niveisCargos/ListClasseNivelCargoService';
import { ShowClasseNivelCargoService } from '../services/niveisCargos/ShowClasseNivelCargoService';
import { UpdateClasseNivelCargoService } from '../services/niveisCargos/UpdateClasseNivelCargoService';

class ClassesNiveisCargosController {
  async index(request: Request, response: Response): Promise<Response> {
    const { nivelCargoId } = request.params;

    const listClasseNivelCargoService = container.resolve(ListClasseNivelCargoService);

    const list = await listClasseNivelCargoService.execute(nivelCargoId);

    return response.json(list);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showClasseNivelCargoService = container.resolve(ShowClasseNivelCargoService);

    const classeNivelCargo = await showClasseNivelCargoService.execute(id);

    return response.json(classeNivelCargo);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { nivelCargoId } = request.params;
    const { codigo, descricao } = request.body;

    const createClasseNivelCargoService = container.resolve(CreateClasseNivelCargoService);

    const classeNivelCargo = await createClasseNivelCargoService.execute({
      codigo,
      descricao,
      nivelCargoId,
    });

    return response.status(201).json(classeNivelCargo);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { codigo, descricao } = request.body;

    const updateClasseNivelCargoService = container.resolve(UpdateClasseNivelCargoService);

    const classeNivelCargo = await updateClasseNivelCargoService.execute({
      id,
      codigo,
      descricao,
    });

    return response.json(classeNivelCargo);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyClasseNivelCargoService = container.resolve(DestroyClasseNivelCargoService);

    await destroyClasseNivelCargoService.execute(id);

    return response.json();
  }
}

export { ClassesNiveisCargosController };
