import { Cargo } from '../../entities/Cargo';
import {
  CreateCargoData, ListCargoData, ICargosRepository, PaginateCargoData,
} from '../models/ICargosRepository';
import { IPage } from '../models/IPage';

class FakeCargosRepository implements ICargosRepository {
  private cargos: Cargo[] = [];

  async create({ nome }: CreateCargoData): Promise<Cargo> {
    const cargo = new Cargo();

    Object.assign(cargo, { nome });

    this.cargos.push(cargo);

    return cargo;
  }

  async update(cargo: Cargo): Promise<Cargo> {
    const index = this.cargos.findIndex((item) => item.id === cargo.id);

    this.cargos[index] = cargo;

    return cargo;
  }

  async destroy(id: string): Promise<void> {
    const index = this.cargos.findIndex((item) => item.id === id);

    this.cargos.splice(index, 1);
  }

  async list({ nome }: ListCargoData): Promise<Cargo[]> {
    let data = [...this.cargos];

    if (nome) {
      data = data.filter((item) => item.nome.includes(nome));
    }

    return data;
  }

  async paginate({ nome, current, perPage }: PaginateCargoData): Promise<IPage<Cargo>> {
    const skip = current * perPage - perPage;
    const take = skip + perPage;

    let data = [...this.cargos];

    if (nome) {
      data = data.filter((item) => item.nome.includes(nome));
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

  async findById(id: string): Promise<Cargo> {
    return this.cargos.find((item) => item.id === id);
  }

  async findByNome(nome: string): Promise<Cargo> {
    return this.cargos.find((item) => item.nome.includes(nome));
  }
}

export { FakeCargosRepository };
