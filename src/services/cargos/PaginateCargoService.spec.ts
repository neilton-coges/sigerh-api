import { TipoCargo } from '../../entities/Cargo';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { PaginateCargoService } from './PaginateCargoService';

let fakeCargosRepository: FakeCargosRepository;
let paginateCargoService: PaginateCargoService;

describe('PaginateCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    paginateCargoService = new PaginateCargoService(fakeCargosRepository);
  });

  it('deve ser possível paginar cargos', async () => {
    const cargo1 = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      nome: 'cargo1',
    });

    await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      nome: 'cargo2',
    });

    const page = await paginateCargoService.execute({
      perPage: 1,
    });

    expect(page.total).toBe(2);
    expect(page.data).toEqual([cargo1]);
  });
});
