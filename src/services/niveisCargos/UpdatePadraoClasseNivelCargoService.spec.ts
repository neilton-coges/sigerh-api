import { AppError } from '../../error/AppError';
import {
  FakePadroesClassesNiveisCargosRepository,
} from '../../repositories/fakes/FakePadroesClassesNiveisCargosRepository';
import {
  UpdatePadraoClasseNivelCargoService,
} from './UpdatePadraoClasseNivelCargoService';

let fakePadroesClassesNiveisCargosRepository: FakePadroesClassesNiveisCargosRepository;
let updatePadraoClasseNivelCargoService: UpdatePadraoClasseNivelCargoService;

describe('UpdatePadraoClasseNivelCargo', () => {
  beforeEach(() => {
    fakePadroesClassesNiveisCargosRepository = new FakePadroesClassesNiveisCargosRepository();
    updatePadraoClasseNivelCargoService = new UpdatePadraoClasseNivelCargoService(
      fakePadroesClassesNiveisCargosRepository,
    );
  });

  it('deve ser possível atualizar um padrão de classe', async () => {
    const padraoClasseNivelCargoCreated = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargoCodigo',
      descricao: 'padraoClasseNivelCargoDescricao',
      valor: 3400,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const padraoClasseNivelCargoUpdated = await updatePadraoClasseNivelCargoService.execute({
      ...padraoClasseNivelCargoCreated,
      descricao: 'padraoClasseNivelCargoDescricaoAtualizado',
    });

    expect(padraoClasseNivelCargoUpdated.descricao).toBe('padraoClasseNivelCargoDescricaoAtualizado');
  });

  it('não deve ser possível atualizar um padrão inexistente', async () => {
    await expect(
      updatePadraoClasseNivelCargoService.execute({
        id: 'padraoClasseNivelCargoIdInexistente',
        codigo: 'padraoClasseNivelCargoCodigo',
        descricao: 'padraoClasseNivelCargoDescricao',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar um padrão com código já existente da classe', async () => {
    const padraoClasseNivelCargo1 = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo1Codigo',
      descricao: 'padraoClasseNivelCargo1Descricao',
      valor: 3200,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    const padraoClasseNivelCargo2 = await fakePadroesClassesNiveisCargosRepository.create({
      codigo: 'padraoClasseNivelCargo2Codigo',
      descricao: 'padraoClasseNivelCargo2Descricao',
      valor: 2900,
      classeNivelCargoId: 'classeNivelCargoId',
    });

    await expect(
      updatePadraoClasseNivelCargoService.execute({
        ...padraoClasseNivelCargo2,
        codigo: padraoClasseNivelCargo1.codigo,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
