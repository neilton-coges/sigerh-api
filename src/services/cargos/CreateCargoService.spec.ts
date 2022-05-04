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
      descricao: 'cargoDescricao',
      nivelCargoId: '',
      intervaloProgressao: 2,
    });

    expect(cargo).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo cargo com descrição já existente', async () => {
    await fakeCargosRepository.create({
      tipo: TipoCargo.COMISSAO,
      descricao: 'cargoDescricaoExistente',
      nivelCargoId: '',
      intervaloProgressao: 2,
    });

    await expect(createCargoService.execute({
      tipo: TipoCargo.EFETIVO,
      descricao: 'cargoDescricaoExistente',
      nivelCargoId: 'cargoNivelCargoId',
      intervaloProgressao: 2,
    })).rejects.toBeInstanceOf(AppError);
  });
});
