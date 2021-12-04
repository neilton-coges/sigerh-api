import { AppError } from '../../error/AppError';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { UpdateCargoService } from './UpdateCargoService';

let fakeCargosRepository: FakeCargosRepository;
let updateCargoService: UpdateCargoService;

describe('UpdateCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    updateCargoService = new UpdateCargoService(fakeCargosRepository);
  });

  it('deve ser possivel atualizar um cargo', async () => {
    const { id } = await fakeCargosRepository.create({
      nome: 'nome',
    });

    const cargoUpdated = await updateCargoService.execute({
      id,
      nome: 'nome atualizado',
    });

    expect(cargoUpdated.nome).toBe('nome atualizado');
  });

  it('não deve ser possível atualizar um cargo inexistente', async () => {
    await expect(
      updateCargoService.execute({ id: 'inexistente', nome: 'nome' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um cargo com nome já existente', async () => {
    await fakeCargosRepository.create({
      nome: 'nome-existente',
    });

    const { id } = await fakeCargosRepository.create({
      nome: 'nome',
    });

    await expect(updateCargoService.execute({
      id,
      nome: 'nome-existente',
    })).rejects.toBeInstanceOf(AppError);
  });
});
