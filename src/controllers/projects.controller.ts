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
import {Projects} from '../models';
import {ProjectsRepository} from '../repositories';

export class ProjectsController {
  constructor(
    @repository(ProjectsRepository)
    public projectsRepository : ProjectsRepository,
  ) {}

  @post('/projects', {
    responses: {
      '200': {
        description: 'Projects model instance',
        content: {'application/json': {schema: getModelSchemaRef(Projects)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projects, {
            title: 'NewProjects',
            exclude: ['id'],
          }),
        },
      },
    })
    projects: Omit<Projects, 'id'>,
  ): Promise<Projects> {
    return this.projectsRepository.create(projects);
  }

  @get('/projects/count', {
    responses: {
      '200': {
        description: 'Projects model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Projects)) where?: Where<Projects>,
  ): Promise<Count> {
    return this.projectsRepository.count(where);
  }

  @get('/projects', {
    responses: {
      '200': {
        description: 'Array of Projects model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Projects, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Projects)) filter?: Filter<Projects>,
  ): Promise<Projects[]> {
    return this.projectsRepository.find(filter);
  }

  @patch('/projects', {
    responses: {
      '200': {
        description: 'Projects PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projects, {partial: true}),
        },
      },
    })
    projects: Projects,
    @param.query.object('where', getWhereSchemaFor(Projects)) where?: Where<Projects>,
  ): Promise<Count> {
    return this.projectsRepository.updateAll(projects, where);
  }

  @get('/projects/{id}', {
    responses: {
      '200': {
        description: 'Projects model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Projects, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Projects)) filter?: Filter<Projects>
  ): Promise<Projects> {
    return this.projectsRepository.findById(id, filter);
  }

  @patch('/projects/{id}', {
    responses: {
      '204': {
        description: 'Projects PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Projects, {partial: true}),
        },
      },
    })
    projects: Projects,
  ): Promise<void> {
    await this.projectsRepository.updateById(id, projects);
  }

  @put('/projects/{id}', {
    responses: {
      '204': {
        description: 'Projects PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() projects: Projects,
  ): Promise<void> {
    await this.projectsRepository.replaceById(id, projects);
  }

  @del('/projects/{id}', {
    responses: {
      '204': {
        description: 'Projects DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.projectsRepository.deleteById(id);
  }
}
