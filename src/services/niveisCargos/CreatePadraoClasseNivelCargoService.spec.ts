import { AppError } from '../../error/AppError';
import {
  FakeClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakeClassesNiveisCargosRepository';
import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  CreatePadraoClasseNivelCargoService,
} from './CreatePadraoClasseNivelCargoService';

let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let fakeClassesNiveisCargosRepository: FakeClassesNiveisCargosRepository;
let createPadraoClasseNivelCargoServiec: CreatePadraoClasseNivelCargoService;

describe('CreatePadraoClasseNivelCargo', () => {
  beforeEach(() => {
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    fakeClassesNiveisCargosRepository = new FakeClassesNiveisCargosRepository();
    createPadraoClasseNivelCargoServiec = new CreatePadraoClasseNivelCargoService(
      fakePadroesClassesNiveisCargosRepository,
      fakeClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível criar um novo padrão para uma classe', async () => {
    const classeNivelCargo = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargoCodigo',
      descricao: 'classeNivelCargoDescricao',
      nivelCargoId: 'nivelCargoId',
    });

    const padraoClasseNivelCargo = await createPadraoClasseNivelCargoServiec.execute({
      codigo: 'padraoClasseNivelCargoCodigo',
      descricao: 'padraoClasseNivelCargoDescricao',
      valor: 3299,
      classeNivelCargoId: classeNivelCargo.id,
    });

    expect(padraoClasseNivelCargo).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo padrão para um classe inexistente', async () => {
    await expect(createPadraoClasseNivelCargoServiec.execute({
      codigo: 'padraoClasseNivelCargoCodigo',
      descricao: 'padraoClasseNivelCargoDescricao',
      valor: 3299,
      classeNivelCargoId: 'classeNivelCargoIdInexistente',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar um novo padrão com código já existente da classe', async () => {
    const classeNivelCargo = await fakeClassesNiveisCargosRepository.create({
      codigo: 'classeNivelCargoCodigo',
      descricao: 'classeNivelCargoDescricao',
      nivelCargoId: 'nivelCargoId',
    });

    const padraoClasseNivelCargo1 = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo1Codigo',
      descricao: 'padraoClasseNivelCargo1Descricao',
      valor: 3200,
      classeNivelCargoId: classeNivelCargo.id,
    });

    await expect(createPadraoClasseNivelCargoServiec.execute({
      codigo: padraoClasseNivelCargo1.codigo,
      descricao: 'padraoClasseNivelCargo2Descricao',
      valor: 3299,
      classeNivelCargoId: classeNivelCargo.id,
    })).rejects.toBeInstanceOf(AppError);
  });
});
