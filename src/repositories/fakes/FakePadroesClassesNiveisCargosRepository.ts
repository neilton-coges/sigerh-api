import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';
import { CreatePadraoClasseNivelCargoData, IPadroesClassesNiveisCargosRepository } from '../models/IPadroesClassesNiveisCargosRepository';

class FakePadroesClassesNiveisCargosRepository implements IPadroesClassesNiveisCargosRepository {
  private padroesClassesNiveisCargos: PadraoClasseNivelCargo[] = [];

  async create({
    codigo,
    descricao,
    valor,
    classeNivelCargoId,
  }: CreatePadraoClasseNivelCargoData): Promise<PadraoClasseNivelCargo> {
    const padraoClasseNivelCargo = new PadraoClasseNivelCargo();

    Object.assign(padraoClasseNivelCargo, {
      codigo,
      descricao,
      valor,
      classeNivelCargoId,
    });

    this.padroesClassesNiveisCargos.push(padraoClasseNivelCargo);

    return padraoClasseNivelCargo;
  }

  async update(padraoClasseNivelCargo: PadraoClasseNivelCargo): Promise<PadraoClasseNivelCargo> {
    const index = this.padroesClassesNiveisCargos.findIndex(
      (item) => item.id === padraoClasseNivelCargo.id,
    );

    this.padroesClassesNiveisCargos[index] = padraoClasseNivelCargo;

    return padraoClasseNivelCargo;
  }

  async updateAll(padroesClasseNiveisCargos: PadraoClasseNivelCargo[]): Promise<void> {
    padroesClasseNiveisCargos.forEach((padrao) => {
      const index = this.padroesClassesNiveisCargos.findIndex((item) => item.id === padrao.id);

      this.padroesClassesNiveisCargos[index] = padrao;
    });
  }

  async destroy(id: string): Promise<void> {
    const index = this.padroesClassesNiveisCargos.findIndex(
      (item) => item.id === id,
    );

    this.padroesClassesNiveisCargos.slice(index, 1);
  }

  async findById(id: string): Promise<PadraoClasseNivelCargo> {
    return this.padroesClassesNiveisCargos.find((item) => item.id === id);
  }

  async findByClasseNivelCargoId(classeNivelCargoId: string): Promise<PadraoClasseNivelCargo[]> {
    return this.padroesClassesNiveisCargos.filter(
      (item) => item.classeNivelCargoId === classeNivelCargoId,
    );
  }

  async findByCodigoAndClasseNivelCargoId(
    codigo: string,
    classeNivelCargoId: string,
  ): Promise<PadraoClasseNivelCargo> {
    return this.padroesClassesNiveisCargos.find(
      (item) => item.codigo === codigo
        && item.classeNivelCargoId === classeNivelCargoId,
    );
  }
}

export { FakePadroesClassesNiveisCargosRepository };
