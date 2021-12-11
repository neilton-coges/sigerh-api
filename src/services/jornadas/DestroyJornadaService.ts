import { inject, injectable } from 'tsyringe';
import { AppError } from '../../error/AppError';
import { IJornadasRepository } from '../../repositories/models/IJornadasRepository';

@injectable()
class DestroyJornadaService {
  constructor(
    @inject('JornadasRepository')
    private jornadasRepository: IJornadasRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const jornadaExists = await this.jornadasRepository.findById(id);

    if (!jornadaExists) {
      throw new AppError('Jornada não encontrada.');
    }

    await this.jornadasRepository.destroy(id);
  }
}

export { DestroyJornadaService };
