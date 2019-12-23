import {DefaultCrudRepository} from '@loopback/repository';
import {Projects, ProjectsRelations} from '../models';
import {DbcontrolDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProjectsRepository extends DefaultCrudRepository<
  Projects,
  typeof Projects.prototype.id,
  ProjectsRelations
> {
  constructor(
    @inject('datasources.dbcontrol') dataSource: DbcontrolDataSource,
  ) {
    super(Projects, dataSource);
  }
}
