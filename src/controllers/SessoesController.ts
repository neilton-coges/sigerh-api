import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessaoService } from '../services/sessoes/CreateSessaoService';

class SessoesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { login, senha } = request.body;

    const createSessaoService = container.resolve(CreateSessaoService);

    const sessao = await createSessaoService.execute({
      login,
      senha,
    });

    return response.status(201).json(sessao);
  }
}

export { SessoesController };
