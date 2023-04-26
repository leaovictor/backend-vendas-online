import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from 'src/city/entities/city.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  cityRepository: any;
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async getCache<T>(
    key: string,
    functionRequest: () => Promise<T>,
  ): Promise<T> {
    const allData: T = await this.cacheManager.get(key);

    if (allData) {
      return allData;
    }

    const cities: T = await functionRequest();

    await this.cacheManager.set(key, cities); //state_ serve para quando quiser adicionar mais cache em outro lugar

    return cities;
  }
}
