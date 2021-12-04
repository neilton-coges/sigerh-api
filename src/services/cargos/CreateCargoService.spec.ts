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
      nome: 'nome',
    });

    expect(cargo).toHaveProperty('id');
  });

  it('não dev ser possível criar um novo cargo com nome já existente', async () => {
    await fakeCargosRepository.create({
      nome: 'nome-existente',
    });

    await expect(createCargoService.execute({
      nome: 'nome-existente',
    })).rejects.toBeInstanceOf(AppError);
  });
});
