import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Allocations} from '../models';
import {AllocationsRepository} from '../repositories';

export class AllocationsController {
  constructor(
    @repository(AllocationsRepository)
    public allocationsRepository : AllocationsRepository,
  ) {}

  @post('/allocations', {
    responses: {
      '200': {
        description: 'Allocations model instance',
        content: {'application/json': {schema: getModelSchemaRef(Allocations)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Allocations, {
            title: 'NewAllocations',
            exclude: ['id'],
          }),
        },
      },
    })
    allocations: Omit<Allocations, 'id'>,
  ): Promise<Allocations> {
    return this.allocationsRepository.create(allocations);
  }

  @get('/allocations/count', {
    responses: {
      '200': {
        description: 'Allocations model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Allocations)) where?: Where<Allocations>,
  ): Promise<Count> {
    return this.allocationsRepository.count(where);
  }

  @get('/allocations', {
    responses: {
      '200': {
        description: 'Array of Allocations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Allocations, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Allocations)) filter?: Filter<Allocations>,
  ): Promise<Allocations[]> {
    return this.allocationsRepository.find(filter);
  }

  @patch('/allocations', {
    responses: {
      '200': {
        description: 'Allocations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Allocations, {partial: true}),
        },
      },
    })
    allocations: Allocations,
    @param.query.object('where', getWhereSchemaFor(Allocations)) where?: Where<Allocations>,
  ): Promise<Count> {
    return this.allocationsRepository.updateAll(allocations, where);
  }

  @get('/allocations/{id}', {
    responses: {
      '200': {
        description: 'Allocations model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Allocations, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Allocations)) filter?: Filter<Allocations>
  ): Promise<Allocations> {
    return this.allocationsRepository.findById(id, filter);
  }

  @patch('/allocations/{id}', {
    responses: {
      '204': {
        description: 'Allocations PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Allocations, {partial: true}),
        },
      },
    })
    allocations: Allocations,
  ): Promise<void> {
    await this.allocationsRepository.updateById(id, allocations);
  }

  @put('/allocations/{id}', {
    responses: {
      '204': {
        description: 'Allocations PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() allocations: Allocations,
  ): Promise<void> {
    await this.allocationsRepository.replaceById(id, allocations);
  }

  @del('/allocations/{id}', {
    responses: {
      '204': {
        description: 'Allocations DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.allocationsRepository.deleteById(id);
  }
}
