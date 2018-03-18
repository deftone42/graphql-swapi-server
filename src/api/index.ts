import { baseUrl } from '../graphql/index';
import { Entities } from './entities.enum';
import { SwapiResult } from '../graphql/models/result.model';

const fetch = require('node-fetch');

export function getList<T>(entity: Entities, search: string) {
  return new Promise((resolve) => {
    let endpoint = baseUrl + entity;
    if (search) {
      endpoint += '?search=' + search;
    }
    fetch(endpoint).then((res) => {
      const result: SwapiResult<T> = res.json();
      resolve(result);
    });
  });
};

export function getObjectById<T>(entity: Entities, id: string) {
  return new Promise((resolve) => {
    fetch(`${baseUrl + entity}/${id}`).then((res) => {
      const result: T = res.json();
      resolve(result);
    });
  });
};

export function getListByUrls<T>(urls: string[]) {
  return new Promise((resolve) => {
    if (!urls) {
      resolve([]);
    }
    const promises = urls.map(url => fetch(url));
    Promise.all(promises).then((res) => {
      const data: T[] = res.map((r) => r.json());
      resolve(data);
    });
  });
}

export function getObjectByUrl<T>(url: string) {
  return new Promise((resolve) => {
    fetch(url).then((res) => {
      const data: T = res.json();
      resolve(data);
    });
  });
}
