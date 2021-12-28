import { inject, injectable } from 'tsyringe';

import { NivelCargo } from '../../entities/NivelCargo';
import { INiveisCargosRepository, ListNivelCargoData } from '../../repositories/models/INiveisCargosRepository';

@injectable()
class ListNivelCargoService {
  constructor(
    @inject('NiveisCargosRepository')
    private niveisCargosRepository: INiveisCargosRepository,
  ) {}

  async execute({ codigo, descricao }: ListNivelCargoData): Promise<NivelCargo[]> {
    return this.niveisCargosRepository.list({
      codigo,
      descricao,
    });
  }
}

export { ListNivelCargoService };
