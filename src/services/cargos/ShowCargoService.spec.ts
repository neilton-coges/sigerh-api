import { AppError } from '../../error/AppError';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { ShowCargoService } from './ShowCargoService';

let fakeCargosRepository: FakeCargosRepository;
let showCargoService: ShowCargoService;

describe('ShowCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    showCargoService = new ShowCargoService(fakeCargosRepository);
  });

  it('deve ser possível mostrar um cargo', async () => {
    const { id } = await fakeCargosRepository.create({
      nome: 'nome',
    });

    const cargo = await showCargoService.execute(id);

    expect(cargo.id).toBe(id);
  });

  it('não deve ser possível mostrar um cargo inexistente', async () => {
    await expect(
      showCargoService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
