import { inject, injectable } from 'tsyringe';

import { Servidor } from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { IServidoresRepository } from '../../repositories/models/IServidoresRepository';

@injectable()
class ShowServidorService {
  constructor(
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute(id: string): Promise<Servidor> {
    const servidor = await this.servidoresRepository.findById(id);

    if (!servidor) {
      throw new AppError('Servidor não encontrado');
    }

    return servidor;
  }
}

export { ShowServidorService };
