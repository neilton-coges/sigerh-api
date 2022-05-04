import { TipoCargo } from '../../entities/Cargo';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { ListCargoService } from './ListCargoService';

let fakeCargosRepository: FakeCargosRepository;
let listCargoService: ListCargoService;

describe('ListCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    listCargoService = new ListCargoService(fakeCargosRepository);
  });

  it('deve ser possível listar cargos', async () => {
    const cargo1 = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargoDescricao',
      nivelCargoId: '',
      intervaloProgressao: undefined,
    });

    const cargo2 = await fakeCargosRepository.create({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargo2Descricao',
      nivelCargoId: '',
      intervaloProgressao: 2,
    });

    const cargos = await listCargoService.execute({});

    expect(cargos).toHaveLength(2);
    expect(cargos).toEqual([cargo1, cargo2]);
  });
});
