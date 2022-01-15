import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaClassesNiveisCargos1640174806845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'classes_niveis_cargos',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'codigo',
          type: 'varchar',
        },
        {
          name: 'descricao',
          type: 'varchar',
        },
        {
          name: 'nivel_cargo_id',
          type: 'uuid',
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
          referencedTableName: 'niveis_cargos',
          referencedColumnNames: ['id'],
          columnNames: ['nivel_cargo_id'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes_niveis_cargos');
  }
}
