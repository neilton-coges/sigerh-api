import { NivelCargo } from '../../entities/NivelCargo';
import {
  CreateNivelCargoData, INiveisCargosRepository, ListNivelCargoData, PaginateNivelCargoData,
} from '../models/INiveisCargosRepository';
import { IPage } from '../models/IPage';

class FakeNiveisCargosRepository implements INiveisCargosRepository {
  private niveisCargos: NivelCargo[] = [];

  async create({ codigo, descricao }: CreateNivelCargoData): Promise<NivelCargo> {
    const nivelCargo = new NivelCargo();

    Object.assign(nivelCargo, {
      codigo,
      descricao,
    });

    this.niveisCargos.push(nivelCargo);

    return nivelCargo;
  }

  async update(nivelCargo: NivelCargo): Promise<NivelCargo> {
    const index = this.niveisCargos.findIndex((item) => item.id === nivelCargo.id);

    this.niveisCargos[index] = nivelCargo;

    return nivelCargo;
  }

  async destroy(id: string): Promise<void> {
    const index = this.niveisCargos.findIndex((item) => item.id === id);

    this.niveisCargos.splice(index, 1);
  }

  async findById(id: string): Promise<NivelCargo> {
    return this.niveisCargos.find((item) => item.id === id);
  }

  async findByCodigo(codigo: string): Promise<NivelCargo> {
    return this.niveisCargos.find((item) => item.codigo === codigo);
  }

  async list({ codigo, descricao }: ListNivelCargoData): Promise<NivelCargo[]> {
    let data = [...this.niveisCargos];

    if (codigo || descricao) {
      data = data.filter(
        (item) => item.codigo.toString().includes(codigo) || item.descricao.includes(descricao),
      );
    }

    if (codigo && descricao) {
      data = data.filter(
        (item) => item.codigo.toString().includes(codigo) && item.descricao.includes(descricao),
      );
    }

    return data;
  }

  async paginate({
    codigo, descricao, current, perPage,
  }: PaginateNivelCargoData): Promise<IPage<NivelCargo>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.niveisCargos];

    if (codigo || descricao) {
      data = data.filter(
        (item) => item.codigo.toString().includes(codigo) || item.descricao.includes(descricao),
      );
    }

    if (codigo && descricao) {
      data = data.filter(
        (item) => item.codigo.toString().includes(codigo) && item.descricao.includes(descricao),
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

export { FakeNiveisCargosRepository };
