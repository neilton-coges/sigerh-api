import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaUnidades1638742749365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'unidades',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'sigla',
          type: 'varchar',
        },
        {
          name: 'descricao',
          type: 'varchar',
        },
        {
          name: 'unidade_pai_id',
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
          columnNames: ['unidade_pai_id'],
          referencedTableName: 'unidades',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('unidades');
  }
}
