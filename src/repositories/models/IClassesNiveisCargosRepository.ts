import { ClasseNivelCargo } from '../../entities/ClasseNivelCargo';

type CreateClasseNivelCargoData = Pick<ClasseNivelCargo, 'codigo' | 'descricao' | 'nivelCargoId'>;
type UpdateClasseNivelCargoData = Pick<ClasseNivelCargo, 'id' | 'codigo' | 'descricao'>;

interface IClassesNiveisCargosRepository {
  create(data: CreateClasseNivelCargoData): Promise<ClasseNivelCargo>;
  update(classeNivelCargo: ClasseNivelCargo): Promise<ClasseNivelCargo>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<ClasseNivelCargo>;
  findByNivelCargoId(nivelCargoId: string): Promise<ClasseNivelCargo[]>;
  findByCodigoAndNivelCargoId(codigo: string, nivelCargoId: string): Promise<ClasseNivelCargo>;
}

export { CreateClasseNivelCargoData, UpdateClasseNivelCargoData, IClassesNiveisCargosRepository };
