import {
  CorRaca, EstadoCivil, Genero, TipoSanguineo,
} from '../../entities/Servidor';
import { FakeServidoresRepository } from '../../repositories/fakes/FakeServidoresRepository';
import { PaginateServidorService } from './PaginateServidorService';

let fakeServidoresRepository: FakeServidoresRepository;
let paginateServidorService: PaginateServidorService;

describe('PaginateService', () => {
  beforeEach(() => {
    fakeServidoresRepository = new FakeServidoresRepository();
    paginateServidorService = new PaginateServidorService(fakeServidoresRepository);
  });

  it('deve ser possível paginar servidores', async () => {
    const servidor1 = await fakeServidoresRepository.create({
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

    await fakeServidoresRepository.create({
      nome: 'servidor2Nome',
      dataNascimento: 'servidor2DataNascimento',
      telefoneCorporativo: 'servidor2TelefoneCorporativo',
      telefonePessoal: 'servidor2TelefonePessoal',
      emailCorporativo: 'servidor2EmailCorporativo',
      emailPessoal: 'servidor2EmailPessoal',
      genero: Genero.MASCULINO,
      tipoSanguineo: TipoSanguineo['A+'],
      corRaca: CorRaca.BRANCA,
      nacionalidade: 'servidor2Nacionalidade',
      naturalidadeCidade: 'servidor2NaturalidadeCidade',
      naturalidadeEstado: 'servidor2NaturalidadeEstado',
      estadoCivil: EstadoCivil.CASADO,
      conjugeNome: 'servidor2ConjugeNome',
      conjugeDataNascimento: 'servidor2ConjugeDataNascimento',
      conjugeCpf: 'servidor2ConjugeCpf',
      nomeMae: 'servidor2NomeMae',
      nomePai: 'servidor2NomePai',
      cpf: 'servidor2Cpf',
      rgNumero: 'servidor2RgNumero',
      rgOrgaoEmissor: 'servidor2RgOrgaoEmissor',
      rgDataEmissao: 'servidor2RgDataEmissao',
      tituloNumero: 'servidor2TituloNumero',
      tituloSecao: 'servidor2TituloSecao',
      tituloZona: 'servidor2TituloZona',
      pis: 'servidor2Pis',
    });

    const page = await paginateServidorService.execute({
      perPage: 1,
    });

    expect(page.data).toEqual([servidor1]);
    expect(page.size).toBe(2);
  });
});
