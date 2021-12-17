import { inject, injectable } from 'tsyringe';

import { CdsFg } from '../../entities/CdsFg';
import { AppError } from '../../error/AppError';
import { ICdsFgsRepository, UpdateCdsFgData } from '../../repositories/models/ICdsFgsRepository';

@injectable()
class UpdateCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    id, tipo, simbologia, remuneracao, quantidadeVagas,
  }: UpdateCdsFgData): Promise<CdsFg> {
    const cdsFg = await this.cdsFgsRepository.findById(id);

    if (!cdsFg) {
      throw new AppError('CDS/FG não encontrado.');
    }

    const cdsFgAlreadyExists = await this.cdsFgsRepository.findBySimbologia(simbologia);

    if (cdsFgAlreadyExists && cdsFgAlreadyExists.id !== id) {
      throw new AppError('Já existe um CDS/FG com esta simbologia.');
    }

    if (quantidadeVagas < cdsFg.quantidadeNomeados) {
      throw new AppError('Não é permitido ter quantidade de vagas menor do que de nomeados.');
    }

    cdsFg.tipo = tipo;
    cdsFg.simbologia = simbologia;
    cdsFg.remuneracao = remuneracao;
    cdsFg.quantidadeVagas = quantidadeVagas;

    const cdsFgUpdated = await this.cdsFgsRepository.update(cdsFg);

    return cdsFgUpdated;
  }
}

export { UpdateCdsFgService };
