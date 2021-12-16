import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../../entities/Servidor';
import { AppError } from '../../error/AppError';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { DestroyServidorService } from './DestroyServidorService';

let fakeServidoresRepostory: FakeServidoresRepository;
let destroyServidorService: DestroyServidorService;

describe('DestroyServidor', () => {
  beforeEach(() => {
    fakeServidoresRepostory = new FakeServidoresRepository();
    destroyServidorService = new DestroyServidorService(fakeServidoresRepostory);
  });

  it('deve ser possível remover um servidor', async () => {
    const servidorCreated = await fakeServidoresRepostory.create({
      nome: 'servidorNome',
      dataNascimento: 'servidorDataNascimento',
      telefoneCorporativo: 'servidorTelefoneCorporativo',
      telefonePessoal: 'servidorTelefonePessoal',
      emailCorporativo: 'servidorEmailCorporativo',
      emailPessoal: 'servidorEmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidorNacionalidade',
      naturalidadeCidade: 'servidorNaturalidadeCidade',
      naturalidadeEstado: 'servidorNaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidorConjugeNome',
      conjugeDataNascimento: 'servidorConjugeDataNascimento',
      conjugeCpf: 'servidorConjugeCpf',
      nomeMae: 'servidorNomeMae',
      nomePai: 'servidorNomePai',
      cpf: 'servidorCpf',
      rgNumero: 'servidorRgNumero',
      rgOrgaoEmissor: 'servidorRgOrgaoEmissor',
      rgDataEmissao: 'servidorRgDataEmissao',
      tituloNumero: 'servidorTituloNumero',
      tituloSecao: 'servidorTituloSecao',
      tituloZona: 'servidorTituloZona',
      pis: 'servidorPis',
    });

    const destroy = jest.spyOn(fakeServidoresRepostory, 'destroy');

    await destroyServidorService.execute(servidorCreated.id);

    expect(destroy).toHaveBeenCalledWith(servidorCreated.id);
  });

  it('não deve ser possível remover um servidor inexistente', async () => {
    await expect(
      destroyServidorService.execute('inexistente'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
