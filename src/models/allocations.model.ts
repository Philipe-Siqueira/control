import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_id_people: {
        name: 'fk_id_people',
        entity: 'people',
        entityKey: 'id',
        foreignKey: 'peopleId',
      },
      fk_id_projects: {
        name: 'fk_id_projects',
        entity: 'projects',
        entityKey: 'id',
        foreignKey: 'projectsId',
      },
    },
  },
})
export class Allocations extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  allocation: number;

  @property({
    type: 'date',
    required: true,
    default: '$now',
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
    default: '$now',
  })
  updated_at: string;

  @property({
    type: 'Number',
  })
  peopleId: number;

  @property({
    type: 'Number',
  })
  projectsId: number;

  constructor(data?: Partial<Allocations>) {
    super(data);
  }
}

export interface AllocationsRelations {
  // describe navigational properties here
}

export type AllocationsWithRelations = Allocations & AllocationsRelations;
