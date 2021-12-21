import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaLotacoes1639931635667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'lotacoes',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'matricula',
          type: 'varchar',
          isUnique: true,
          isNullable: true,
        },
        {
          name: 'data_admissao',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'observacao',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'servidor_id',
          type: 'uuid',
        },
        {
          name: 'cargo_id',
          type: 'uuid',
        },
        {
          name: 'cds_fg_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'unidade_id',
          type: 'uuid',
        },
        {
          name: 'subunidade_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'jornada_id',
          type: 'uuid',
          isNullable: true,
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
      foreignKeys: [
        {
          referencedTableName: 'servidores',
          referencedColumnNames: ['id'],
          columnNames: ['servidor_id'],
        },
        {
          referencedTableName: 'cargos',
          referencedColumnNames: ['id'],
          columnNames: ['cargo_id'],
        },
        {
          referencedTableName: 'cds_fgs',
          referencedColumnNames: ['id'],
          columnNames: ['cds_fg_id'],
        },
        {
          referencedTableName: 'unidades',
          referencedColumnNames: ['id'],
          columnNames: ['unidade_id'],
        },
        {
          referencedTableName: 'unidades',
          referencedColumnNames: ['id'],
          columnNames: ['subunidade_id'],
        },
        {
          referencedTableName: 'jornadas',
          referencedColumnNames: ['id'],
          columnNames: ['jornada_id'],
        },

      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lotacoes');
  }
}
