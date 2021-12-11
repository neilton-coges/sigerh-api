import { inject, injectable } from 'tsyringe';
import { Jornada } from '../../entities/Jornada';
import { IJornadasRepository } from '../../repositories/models/IJornadasRepository';

@injectable()
class ListJornadaService {
  constructor(
    @inject('JornadasRepository')
    private jornadasRepository: IJornadasRepository,
  ) {}

  async execute(): Promise<Jornada[]> {
    return this.jornadasRepository.listWithHoras();
  }
}

export { ListJornadaService };
