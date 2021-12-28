import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaReajustesClassesNiveisCargos1640175321487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'reajustes_classes_niveis_cargos',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'percentual',
          type: 'numeric',
        },
        {
          name: 'observacao',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'classe_nivel_cargo_id',
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
          referencedTableName: 'classes_niveis_cargos',
          referencedColumnNames: ['id'],
          columnNames: ['classe_nivel_cargo_id'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reajustes_classes_niveis_cargos');
  }
}
