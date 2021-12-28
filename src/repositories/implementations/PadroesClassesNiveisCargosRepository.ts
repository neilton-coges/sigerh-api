import { getRepository, Repository } from 'typeorm';

import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import { CreatePadraoClasseNivelCargoData, IPadroesClassesNiveisCargosRepository } from '../models/IPadroesClassesNiveisCargosRepository';

class PadroesClassesNiveisCargosRepository implements IPadroesClassesNiveisCargosRepository {
  private repository: Repository<PadraoClasseNivelCargo>;

  constructor() {
    this.repository = getRepository(PadraoClasseNivelCargo);
  }

  async create({
    codigo,
    descricao,
    valor,
    classeNivelCargoId,
  }: CreatePadraoClasseNivelCargoData): Promise<PadraoClasseNivelCargo> {
    const padraoClasseNivelCargo = this.repository.create({
      codigo,
      descricao,
      valor,
      valorReajustado: valor,
      classeNivelCargoId,
    });

    return this.repository.save(padraoClasseNivelCargo);
  }

  async update(padraoClasseNivelCargo: PadraoClasseNivelCargo): Promise<PadraoClasseNivelCargo> {
    return this.repository.save(padraoClasseNivelCargo);
  }

  async updateAll(padroesClasseNiveisCargos: PadraoClasseNivelCargo[]): Promise<void> {
    await this.repository.save(padroesClasseNiveisCargos);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<PadraoClasseNivelCargo> {
    return this.repository.findOne(id);
  }

  async findByClasseNivelCargoId(classeNivelCargoId: string): Promise<PadraoClasseNivelCargo[]> {
    return this.repository.find({
      classeNivelCargoId,
    });
  }

  async findByCodigoAndClasseNivelCargoId(
    codigo: string,
    classeNivelCargoId: string,
  ): Promise<PadraoClasseNivelCargo> {
    return this.repository.findOne({
      codigo,
      classeNivelCargoId,
    });
  }
}

export { PadroesClassesNiveisCargosRepository };
