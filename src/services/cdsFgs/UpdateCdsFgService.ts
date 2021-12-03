import { inject, injectable } from 'tsyringe';
import { CdsFg } from '../../entities/CdsFg';
import { AppError } from '../../error/AppError';
import { ICdsFgsRepository } from '../../repositories/models/ICdsFgsRepository';

type UpdateCdsFgRequest = Omit<CdsFg, 'qtdNomeados' | 'createdAt' | 'updatedAt'>

@injectable()
class UpdateCdsFgService {
  constructor(
    @inject('CdsFgsRepository')
    private cdsFgsRepository: ICdsFgsRepository,
  ) {}

  async execute({
    id, tipo, sigla, nome, valor, qtdVagas,
  }: UpdateCdsFgRequest): Promise<CdsFg> {
    const cdsFg = await this.cdsFgsRepository.findById(id);

    if (!cdsFg) {
      throw new AppError('CDS/FG não encontrado.');
    }

    const cdsFgAlreadyExists = await this.cdsFgsRepository.findBySigla(sigla);

    if (cdsFgAlreadyExists && cdsFgAlreadyExists.id !== id) {
      throw new AppError('Já existe um CDS/FG com esta sigla.');
    }

    if (qtdVagas < cdsFg.qtdNomeados) {
      throw new AppError('Não é permitido ter quantidade de vagas menor do que de nomeados.');
    }

    cdsFg.tipo = tipo;
    cdsFg.sigla = sigla;
    cdsFg.nome = nome;
    cdsFg.valor = valor;
    cdsFg.qtdVagas = qtdVagas;

    const cdsFgUpdated = await this.cdsFgsRepository.update(cdsFg);

    return cdsFgUpdated;
  }
}

export { UpdateCdsFgService };
