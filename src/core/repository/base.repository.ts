import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  ObjectLiteral,
} from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async save(entity: T | DeepPartial<T>): Promise<T> {
    return await this.repository.save(entity);
  }

  async findOneById(id: any): Promise<T | null> {
    const options: FindOneOptions = { where: { id: id as string } };
    return await this.repository.findOne(options as FindOneOptions<T>);
  }

  async findByCondition(filterCondition: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(filterCondition);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async updateOne(id: any, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOneById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    Object.assign(entity as any, data);
    return await this.repository.save(entity);
  }

  async remove(id: any): Promise<boolean> {
    const entity = await this.findOneById(id);
    if (entity) {
      await this.repository.remove(entity);
      return true;
    }
    return false;
  }
}
