import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaProgressoes1648993666255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'progressoes',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'servidor_id',
          type: 'uuid',
        },
        {
          name: 'lotacao_id',
          type: 'uuid',
        },
        {
          name: 'cargo_id',
          type: 'uuid',
        },
        {
          name: 'classe_nivel_cargo_id',
          type: 'uuid',
        },
        {
          name: 'padrao_classe_nivel_cargo_id',
          type: 'uuid',
        },
        {
          name: 'data_progressao',
          type: 'date',
        },
        {
          name: 'processo',
          type: 'varchar',
        },
        {
          name: 'observacao',
          type: 'varchar',
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
          referencedTableName: 'lotacoes',
          referencedColumnNames: ['id'],
          columnNames: ['lotacao_id'],
        },
        {
          referencedTableName: 'cargos',
          referencedColumnNames: ['id'],
          columnNames: ['cargo_id'],
        },
        {
          referencedTableName: 'classes_niveis_cargos',
          referencedColumnNames: ['id'],
          columnNames: ['classe_nivel_cargo_id'],
        },
        {
          referencedTableName: 'padroes_classes_niveis_cargos',
          referencedColumnNames: ['id'],
          columnNames: ['padrao_classe_nivel_cargo_id'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('progressoes');
  }
}
