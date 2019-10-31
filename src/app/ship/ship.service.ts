import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ShipInterface, ShipsResponse } from './interface/ship.interface';
import { Observable } from 'rxjs';

const BASE_URL = 'https://swapi.co/api';

@Injectable({providedIn: 'root'})
export class ShipService {
  public count: number;

  constructor(private http: HttpClient) {}
  /**
   * Get list of ships
   * @param page
   */
  getListOfStartShips(page: number): Observable<ShipInterface[]> {
    console.log('PAGE!!!', page);
    return this.http.get(`${BASE_URL}/starships/?page=${page}`).pipe(map((res: ShipsResponse) => {
      this.count = res.count;
      return res.results.map(data => ({
        name: data.name,
        MGLT: data.MGLT,
        manufacturer: data.manufacturer,
        crew: data.crew,
        starship_class: data.starship_class
      }));
    }));
  }
}