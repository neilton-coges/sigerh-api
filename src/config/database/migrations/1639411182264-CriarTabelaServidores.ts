import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaServidores1639436969524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'servidores',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'nome',
          type: 'varchar',
        },
        {
          name: 'data_nascimento',
          type: 'varchar',
        },
        {
          name: 'telefone_corporativo',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'telefone_pessoal',
          type: 'varchar',
        },
        {
          name: 'email_corporativo',
          type: 'varchar',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'email_pessoal',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'genero',
          type: 'enum',
          enum: ['MASCULINO', 'FEMININO'],
        },
        {
          name: 'tipo_sanguineo',
          type: 'enum',
          enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        },
        {
          name: 'cor_raca',
          type: 'enum',
          enum: ['BRANCA', 'PRETA', 'PARDA', 'AMARELA', 'INDIGENA'],
        },
        {
          name: 'nacionalidade',
          type: 'varchar',
        },
        {
          name: 'naturalidade_cidade',
          type: 'varchar',
        },
        {
          name: 'naturalidade_estado',
          type: 'varchar',
        },
        {
          name: 'estado_civil',
          type: 'enum',
          enum: ['SOLTEIRO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUVO'],
        },
        {
          name: 'conjuge_nome',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'conjuge_cpf',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'conjuge_data_nascimento',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'nome_pai',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'nome_mae',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'cpf',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'rg_numero',
          type: 'varchar',
        },
        {
          name: 'rg_orgao_emissor',
          type: 'varchar',
        },
        {
          name: 'rg_data_emissao',
          type: 'varchar',
        },
        {
          name: 'titulo_numero',
          type: 'varchar',
        },
        {
          name: 'titulo_secao',
          type: 'varchar',
        },
        {
          name: 'titulo_zona',
          type: 'varchar',
        },
        {
          name: 'pis',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('servidores');
  }
}
