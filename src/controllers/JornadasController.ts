import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateJornadaService } from '../services/jornadas/CreateJornadaService';
import { DestroyJornadaService } from '../services/jornadas/DestroyJornadaService';
import { ListJornadaService } from '../services/jornadas/ListJornadaService';
import { ShowJornadaService } from '../services/jornadas/ShowJornadaService';
import { UpdateJornadaService } from '../services/jornadas/UpdateJornadaService';

class JornadasController {
  async index(request: Request, response: Response): Promise<Response> {
    const listJornadaService = container.resolve(ListJornadaService);

    const jornadas = await listJornadaService.execute();

    return response.json(jornadas);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showJornadaService = container.resolve(ShowJornadaService);

    const jornada = await showJornadaService.execute(id);

    return response.json(jornada);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descricao, horas } = request.body;

    const createJornadaService = container.resolve(CreateJornadaService);

    const jornada = await createJornadaService.execute({
      descricao,
      horas,
    });

    return response.status(201).json(jornada);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao, horas } = request.body;

    const updateJornadaService = container.resolve(UpdateJornadaService);

    const jornada = await updateJornadaService.execute({
      id,
      descricao,
      horas,
    });

    return response.json(jornada);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const destroyJornadaService = container.resolve(DestroyJornadaService);

    await destroyJornadaService.execute(id);

    return response.json();
  }
}

export { JornadasController };
