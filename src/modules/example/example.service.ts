import { Inject, Injectable } from '@nestjs/common';

import type { CreateExampleDto, UpdateExampleDto } from './example.dto';
import { ExampleRepository } from './example.repository';
import type { ExampleItem } from './example.types';

@Injectable()
export class ExampleService {
  constructor(
    @Inject(ExampleRepository) private readonly repository: ExampleRepository,
  ) {}

  findAll(): ExampleItem[] {
    return this.repository.findAll();
  }

  findOne(id: string): ExampleItem {
    return this.repository.findById(id);
  }

  create(dto: CreateExampleDto): ExampleItem {
    const now = new Date().toISOString();
    const item: ExampleItem = {
      id: crypto.randomUUID(),
      name: dto.name,
      description: dto.description,
      createdAt: now,
      updatedAt: now,
    };
    return this.repository.create(item);
  }

  update(id: string, dto: UpdateExampleDto): ExampleItem {
    return this.repository.update(id, dto);
  }

  remove(id: string): void {
    this.repository.remove(id);
  }
}
