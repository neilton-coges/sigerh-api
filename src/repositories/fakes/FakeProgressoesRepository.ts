import { isWithinInterval } from 'date-fns';

import { IPage } from 'repositories/models/IPage';
import { Progressao } from '../../entities/Progressao';
import {
  CreateProgressaoData, IProgressoesRepository, ListProgressaoData, PaginateProgressaoData,
} from '../models/IProgressoesRepository';

class FakeProgressoesRepository implements IProgressoesRepository {
  private progressoes: Progressao[] = [];

  async create({
    servidorId,
    lotacaoId,
    cargoId,
    classeNivelCargoId,
    padraoClasseNivelCargoId,
    dataProgressao,
    processo,
    observacao,
  }: CreateProgressaoData): Promise<Progressao> {
    const progressao = new Progressao();

    Object.assign(progressao, {
      servidorId,
      lotacaoId,
      cargoId,
      classeNivelCargoId,
      padraoClasseNivelCargoId,
      dataProgressao,
      processo,
      observacao,
    });

    this.progressoes.push(progressao);

    return progressao;
  }

  async findById(id: string): Promise<Progressao> {
    return this.progressoes.find((item) => item.id === id);
  }

  async findByServidorIdAndLotacaoId(servidorId: string, lotacaoId: string): Promise<Progressao[]> {
    return this.progressoes.filter(
      (progressao) => progressao.servidorId === servidorId && progressao.lotacaoId === lotacaoId,
    );
  }

  async list({
    servidorId,
    dataProgressaoInicio,
    dataProgressaoFim,
  }: ListProgressaoData): Promise<Progressao[]> {
    let data = [...this.progressoes];

    if (servidorId || dataProgressaoInicio || dataProgressaoFim) {
      data = this.progressoes.filter(
        (item) => item.servidorId === servidorId
        || isWithinInterval(item.dataProgressao, {
          start: dataProgressaoInicio,
          end: dataProgressaoFim,
        }),
      );
    }

    if (servidorId && dataProgressaoInicio && dataProgressaoFim) {
      data = this.progressoes.filter(
        (item) => item.servidorId === servidorId
        && isWithinInterval(item.dataProgressao, {
          start: dataProgressaoInicio,
          end: dataProgressaoFim,
        }),
      );
    }

    return data;
  }

  async paginate({
    servidorId, dataProgressaoInicio, dataProgressaoFim, current, perPage,
  }: PaginateProgressaoData): Promise<IPage<Progressao>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.progressoes];

    if (servidorId || (dataProgressaoInicio && dataProgressaoFim)) {
      data = data.filter(
        (item) => item.servidorId === servidorId || isWithinInterval(item.dataProgressao, {
          start: dataProgressaoInicio,
          end: dataProgressaoFim,
        }),
      );
    }

    if (servidorId && (dataProgressaoInicio && dataProgressaoFim)) {
      data = data.filter(
        (item) => item.servidorId === servidorId && isWithinInterval(item.dataProgressao, {
          start: dataProgressaoInicio,
          end: dataProgressaoFim,
        }),
      );
    }

    const size = data.length;
    const total = Math.ceil(size / perPage);

    data = data.slice(skip, take);

    return {
      data,
      perPage,
      current,
      size,
      total,
    };
  }
}

export { FakeProgressoesRepository };
