import { hash } from 'bcryptjs';
import { createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

async function run() {
  const connection = await createConnection();
  const queryRunner = connection.createQueryRunner();

  await queryRunner.connect();

  try {
    const servidoresRepository = queryRunner.manager.getRepository('servidores');
    const usuariosRepository = queryRunner.manager.getRepository('usuarios');

    const servidorId = uuidV4();
    const usuarioId = uuidV4();

    await queryRunner.startTransaction();

    await servidoresRepository.save({
      id: servidorId,
      nome: 'NEILTON DE SOUZA BARBOSA',
      dataNascimento: '21/12/1992',
      telefoneCorporativo: '',
      telefonePessoal: '(69) 99602-2515',
      emailCorporativo: 'neilton.barbosa@sefin.ro.gov.br',
      emailPessoal: 'neilton.souzab@gmail.com',
      genero: 'MASCULINO',
      tipoSanguineo: 'A+',
      corRaca: 'BRANCA',
      nacionalidade: 'Brasileira',
      naturalidadeCidade: 'Manaus',
      naturalidadeEstado: 'Amazonas',
      estadoCivil: 'CASADO',
      conjugeNome: 'ANDREZA PEREIRA DE FREITAS',
      conjugeCpf: '544.742.482-87',
      conjugeDataNascimento: '29/04/1994',
      nomeMae: 'SELMA PAVAO SOUZA',
      nomePai: 'NEEMIAS MACHADO BARBOSA',
      cpf: '019.395.532-61',
      rgNumero: '22321543',
      rgOrgaoEmissor: 'SSP/AM',
      rgDataEmissao: '03/03/2010',
      tituloNumero: '1923192371923871',
      tituloSecao: '123',
      tituloZona: '040',
      pis: '120381238',
    });

    const senhaHash = await hash('123456', 8);

    await usuariosRepository.save({
      id: usuarioId,
      login: '01939553261',
      senha: senhaHash,
      tipo: 'ADMIN',
      servidorId,
    });

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new Error(err);
  } finally {
    await queryRunner.release();
    await connection.close();
  }
}

run()
  .then(() => console.log('LOG: Seed servidores - finished running with success'))
  .catch((err) => {
    console.log('LOG: Seed servidores - finished running with error');
    console.log(err);
  });
