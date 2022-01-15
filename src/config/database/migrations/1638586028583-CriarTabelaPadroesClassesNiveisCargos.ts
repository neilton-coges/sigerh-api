import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaPadroesClassesNiveisCargos1640175078642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'padroes_classes_niveis_cargos',
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
          name: 'valor',
          type: 'numeric',
        },
        {
          name: 'valor_reajustado',
          type: 'numeric',
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
    await queryRunner.dropTable('padroes_classes_niveis_cargos');
  }
}
