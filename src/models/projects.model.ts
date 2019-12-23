import {Entity, model, property} from '@loopback/repository';

@model()
export class Projects extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  system: string;

  @property({
    type: 'string',
    required: true,
  })
  project: string;

  @property({
    type: 'date',
  })
  delivery?: string;

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
  
  constructor(data?: Partial<Projects>) {
    super(data);
  }
}

export interface ProjectsRelations {
  // describe navigational properties here
}

export type ProjectsWithRelations = Projects & ProjectsRelations;
