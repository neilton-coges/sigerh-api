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
      descricao: 'cargo1Descricao',
      nivelCargoId: '',
    });

    await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo2Descricao',
      nivelCargoId: 'nivelCargoId',
    });

    const page = await paginateCargoService.execute({
      perPage: 1,
    });

    expect(page.total).toBe(2);
    expect(page.data).toEqual([cargo1]);
  });
});
