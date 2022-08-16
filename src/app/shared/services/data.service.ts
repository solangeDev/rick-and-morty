import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { FindValueOperator } from 'rxjs/internal/operators/find';
import {
  catchError,
  find,
  mergeMap,
  pluck,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { characters, episodes } from '../interfaces/data.interface';
import { LocalStorageService } from './localStorage.service';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //observers
  private episodesSubject = new BehaviorSubject<episodes[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<characters[]>([]);
  characters$ = this.charactersSubject.asObservable();
  constructor(
    private apollo: Apollo,
    private localStorageSvc: LocalStorageService
  ) {
    this.getDataApi();
  }

  //este metodo no devolvera nada
  private getDataApi(): void {
    this.apollo
      .watchQuery<any>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.episodesSubject.next(episodes.results);
          // this.charactersSubject.next(characters.results);
          this.parseCharactersData(characters.results);
        })
      )
      .subscribe();
  }

  private parseCharactersData(characters: characters[]): void {
    const currentFavs = this.localStorageSvc.getFavoriteCharacters();
    const newData = characters.map(character => {
      const found = !!currentFavs.find((fav: characters) => fav.id === character.id);
      return {...character, isFavorite : found};
    });
    this.charactersSubject.next(newData);
  }
}
