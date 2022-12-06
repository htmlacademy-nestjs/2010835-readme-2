import {plainToInstance, ClassConstructor} from 'class-transformer';

export function fillObject<T1, T2>(dto: ClassConstructor<T1>, plainObject: T2): T1{
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
