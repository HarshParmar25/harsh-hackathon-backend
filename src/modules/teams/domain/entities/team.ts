export class Team {
  private constructor(
    private readonly id: number,
    private name: string,
    private description: string | null,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt: Date | null
  ) {}

  static create(props: {
    id?: number;
    name: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): Team {
    return new Team(
      props.id || 0,
      props.name,
      props.description || null,
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
      props.deletedAt || null
    );
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | null {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  update(props: { name?: string; description?: string | null }): void {
    if (props.name) this.name = props.name;
    if (props.description !== undefined) this.description = props.description;
    this.updatedAt = new Date();
  }

  delete(): void {
    this.deletedAt = new Date();
  }
}
