import { inject, injectable } from 'tsyringe';

import { AppError } from '../../error/AppError';
import { IServidoresRepository } from '../../repositories/models/IServidoresRepository';

@injectable()
class DestroyServidorService {
  constructor(
    @inject('ServidoresRepository')
    private servidoresRepository: IServidoresRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const servidorNotExists = await this.servidoresRepository.findById(id);

    if (!servidorNotExists) {
      throw new AppError('Servidor não encontrado.');
    }

    await this.servidoresRepository.destroy(id);
  }
}

export { DestroyServidorService };
