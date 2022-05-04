import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class
AdicionaColunaClasseNivelCargoIdNaTabelaLotacoes1649115938902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('lotacoes', new TableColumn({
      name: 'classe_nivel_cargo_id',
      type: 'uuid',
      isNullable: true,
    }));
    await queryRunner.createForeignKey('lotacoes', new TableForeignKey({
      name: 'fk_lotacoes_classe_nivel_cargo_id',
      referencedTableName: 'classes_niveis_cargos',
      referencedColumnNames: ['id'],
      columnNames: ['classe_nivel_cargo_id'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lotacoes', 'fk_lotacoes_classe_nivel_cargo_id');
    await queryRunner.dropColumn('lotacoes', 'classe_nivel_cargo_id');
  }
}
