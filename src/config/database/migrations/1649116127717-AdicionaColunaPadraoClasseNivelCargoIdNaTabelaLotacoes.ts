import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class
AdicionaColunaPadraoClasseNivelCargoIdNaTabelaLotacoes1649116127717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('lotacoes', new TableColumn({
      name: 'padrao_classe_nivel_cargo_id',
      type: 'uuid',
      isNullable: true,
    }));
    await queryRunner.createForeignKey('lotacoes', new TableForeignKey({
      name: 'fk_lotacoes_padrao_classe_nivel_cargo_id',
      referencedTableName: 'padroes_classes_niveis_cargos',
      referencedColumnNames: ['id'],
      columnNames: ['padrao_classe_nivel_cargo_id'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lotacoes', 'fk_lotacoes_padrao_classe_nivel_cargo_id');
    await queryRunner.dropColumn('lotacoes', 'padrao_classe_nivel_cargo_id');
  }
}
