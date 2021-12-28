import { AppError } from '../../error/AppError';
import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  FakeReajustesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeReajustesClassesNiveisCargosRepository';
import {
  CreateReajusteClasseNivelCargoService,
} from './CreateReajusteClasseNivelCargoService';

let fakeReajustesClassesNiveisCargosRepository: FakeReajustesClassesNiveisCargosRepository;
let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let createReajusteClasseNivelCargoService: CreateReajusteClasseNivelCargoService;

describe('CreateReajusteClasseNivelCargo', () => {
  beforeEach(() => {
    fakeReajustesClassesNiveisCargosRepository = new FakeReajustesClassesNiveisCargosRepository();
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    createReajusteClasseNivelCargoService = new CreateReajusteClasseNivelCargoService(
      fakeReajustesClassesNiveisCargosRepository,
      fakePadroesClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível criar um reajuste para um classe', async () => {
    await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo1Codigo',
      descricao: 'padraoClasseNivelCargo1Descricao',
      valor: 2399,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo2Codigo',
      descricao: 'padraoClasseNivelCargo2Descricao',
      valor: 4250,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const reajusteClasseNivelCargo = await createReajusteClasseNivelCargoService.execute({
      percentual: 3,
      observacao: 'reajusteClasseNivelCargoObervacao',
      classeNivelCargoId: 'classeNivelCargoId',
    });

    expect(reajusteClasseNivelCargo).toHaveProperty('id');
  });

  it('não deve ser possível criar um reajuste se não tiver nenhum padrão cadastrado', async () => {
    await expect(
      createReajusteClasseNivelCargoService.execute({
        percentual: 3,
        observacao: 'reajusteClasseNivelCargoObervacao',
        classeNivelCargoId: 'classeNivelCargoId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
