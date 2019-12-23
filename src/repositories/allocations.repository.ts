import {DefaultCrudRepository} from '@loopback/repository';
import {Allocations, AllocationsRelations} from '../models';
import {DbcontrolDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AllocationsRepository extends DefaultCrudRepository<
  Allocations,
  typeof Allocations.prototype.id,
  AllocationsRelations
> {
  constructor(
    @inject('datasources.dbcontrol') dataSource: DbcontrolDataSource,
  ) {
    super(Allocations, dataSource);
  }
}
