import { TipoCargo } from '../../entities/Cargo';
import { Lotacao } from '../../entities/Lotacao';
import { CreateLotacaoData, ILotacoesRepository } from '../models/ILotacoesRepository';

class FakeLotacoesRepository implements ILotacoesRepository {
  private lotacoes: Lotacao[] = [];

  async create({
    servidorId,
    cargoId,
    cdsFgId,
    unidadeId,
    cargo,
  }: CreateLotacaoData): Promise<Lotacao> {
    const lotacao = new Lotacao();

    Object.assign(lotacao, {
      servidorId,
      cargoId,
      cdsFgId,
      unidadeId,
      cargo,
    });

    this.lotacoes.push(lotacao);

    return lotacao;
  }

  async update(lotacao: Lotacao): Promise<Lotacao> {
    const index = this.lotacoes.findIndex((item) => item.id === lotacao.id);

    this.lotacoes[index] = lotacao;

    return lotacao;
  }

  async findById(id: string): Promise<Lotacao> {
    return this.lotacoes.find((item) => item.id === id);
  }

  async findByMatricula(matricula: string): Promise<Lotacao> {
    return this.lotacoes.find((item) => item.matricula === matricula);
  }

  async findByServidorId(servidorId: string): Promise<Lotacao[]> {
    return this.lotacoes.filter((item) => item.servidorId === servidorId);
  }

  async findByServidorIdAndTipoCargo(servidorId: string, tipoCargo: TipoCargo): Promise<Lotacao> {
    return this.lotacoes
      .find((item) => item.servidorId === servidorId && item.cargo.tipo === tipoCargo);
  }
}

export { FakeLotacoesRepository };
