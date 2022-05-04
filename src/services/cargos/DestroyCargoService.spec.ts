import { TipoCargo } from '../../entities/Cargo';
import { AppError } from '../../error/AppError';
import { FakeCargosRepository } from '../../repositories/fakes/FakeCargosRepository';
import { DestroyCargoService } from './DestroyCargoService';

let fakeCargosRepository: FakeCargosRepository;
let destroyCargoService: DestroyCargoService;

describe('DestroyCargo', () => {
  beforeEach(() => {
    fakeCargosRepository = new FakeCargosRepository();
    destroyCargoService = new DestroyCargoService(fakeCargosRepository);
  });

  it('deve ser possível remover um cargo', async () => {
    const { id } = await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargoDescricao',
      nivelCargoId: '',
      intervaloProgressao: undefined,
    });

    const destroy = jest.spyOn(fakeCargosRepository, 'destroy');

    await destroyCargoService.execute(id);

    expect(destroy).toHaveBeenCalledWith(id);
  });

  it('não deve ser possível remover um cargo inexistente', async () => {
    await expect(
      destroyCargoService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
