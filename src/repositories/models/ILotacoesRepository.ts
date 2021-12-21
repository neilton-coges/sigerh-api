import { Cargo, TipoCargo } from '../../entities/Cargo';
import { Lotacao } from '../../entities/Lotacao';

type CreateLotacaoData = Pick<Lotacao, 'cargoId' | 'cdsFgId' | 'unidadeId' | 'servidorId'> & {
  cargo?: Cargo;
}

type UpdateLotacaoData = Pick<Lotacao, 'id' | 'matricula' | 'observacao' | 'dataAdmissao' | 'subUnidadeId' | 'jornadaId'>;

interface ILotacoesRepository {
  create(data: CreateLotacaoData): Promise<Lotacao>;
  update(lotacao: Lotacao): Promise<Lotacao>;
  findById(id: string): Promise<Lotacao>;
  findByMatricula(matricula: string): Promise<Lotacao>;
  findByServidorId(servidorId: string): Promise<Lotacao[]>;
  findByServidorIdAndTipoCargo(servidorId: string, tipoCargo: TipoCargo): Promise<Lotacao>;
}

export { CreateLotacaoData, UpdateLotacaoData, ILotacoesRepository };
