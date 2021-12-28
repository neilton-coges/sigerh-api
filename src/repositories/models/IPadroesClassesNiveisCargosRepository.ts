import { PadraoClasseNivelCargo } from '../../entities/PadraoClasseNivelCargo';

type CreatePadraoClasseNivelCargoData =
  Pick<PadraoClasseNivelCargo, 'codigo' | 'descricao' | 'valor' | 'classeNivelCargoId'>;

type UpdatePadraoClasseNivelCargoData =
  Pick<PadraoClasseNivelCargo, 'id' | 'codigo' | 'descricao'>;

interface IPadroesClassesNiveisCargosRepository {
  create(data: CreatePadraoClasseNivelCargoData): Promise<PadraoClasseNivelCargo>;
  update(padraoClasseNivelCargo: PadraoClasseNivelCargo): Promise<PadraoClasseNivelCargo>;
  updateAll(padroesClasseNiveisCargos: PadraoClasseNivelCargo[]): Promise<void>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<PadraoClasseNivelCargo>;
  findByClasseNivelCargoId(classeNivelCargoId: string): Promise<PadraoClasseNivelCargo[]>;
  findByCodigoAndClasseNivelCargoId(
    codigo: string,
    classeNivelCargoId: string
  ): Promise<PadraoClasseNivelCargo>;
}

export {
  CreatePadraoClasseNivelCargoData,
  UpdatePadraoClasseNivelCargoData,
  IPadroesClassesNiveisCargosRepository,
};
