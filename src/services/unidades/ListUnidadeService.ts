import { inject, injectable } from 'tsyringe';

import { Unidade } from '../../entities/Unidade';
import { IUnidadesRepository, ListUnidadeData } from '../../repositories/models/IUnidadesRepository';

@injectable()
class ListUnidadeService {
  constructor(
    @inject('UnidadesRepository')
    private unidadesRepository: IUnidadesRepository,
  ) {}

  async execute({ descricao, sigla }: ListUnidadeData): Promise<Unidade[]> {
    const unidades = await this.unidadesRepository.list({ descricao, sigla });

    return unidades;
  }
}

export { ListUnidadeService };
