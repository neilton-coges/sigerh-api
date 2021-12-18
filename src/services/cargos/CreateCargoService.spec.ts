import { TipoCargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { CreateCargoService } from './CreateCargoService';

let fakeCargosRepository: FakeCargosRepository;
let createCargoService: CreateCargoService;
describe('CreateCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    createCargoService = new CreateCargoService(fakeCargosRepository);
  });

  it('deve ser possível criar um novo cargo', async () => {
    const cargo = await createCargoService.execute({
      tipo: TipoCargo.COMISSAO,
      nome: 'cargoNome',
    });

    expect(cargo).toHaveProperty('id');
  });

  it('não dev ser possível criar um novo cargo com nome já existente', async () => {
    await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      nome: 'cargoNomeExistente',
    });

    await expect(createCargoService.execute({
      tipo: TipoCargo.EFETIVO,
      nome: 'cargoNomeExistente',
    })).rejects.toBeInstanceOf(AppError);
  });
});
