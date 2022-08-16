import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { characters } from '@shared/interfaces/data.interface';

const MY_FAVORITES = 'Mi favoritos';

// lo queremos inyectar en el modulo central de nuestra apliacion
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  //crear observable
  private charactersFavSubject = new BehaviorSubject<characters[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();
  constructor() {
    this.initialStorage();
  }

  getFavoriteCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES) || '[]');
      //almacenar en un observable el resultado
      this.charactersFavSubject.next(charactersFav);

      return charactersFav;
    } catch (error) {
      console.log(error);
    }
  }

  private removeFromfavorite(id: number): void {
    try {
      const currentFavs = this.getFavoriteCharacters();
      const characters = currentFavs.filter((item: { id: number; }) => item.id !== id)
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      //guardar en nuestro observable
      this.charactersFavSubject.next([...characters]);
    } catch (error) {
      console.log(error);
      alert('Error');
    }
  }

  private addToFavorite(character: characters): void {
    try {
      const currentFavs = this.getFavoriteCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentFavs, character]));
      //guardar en nuestro observable
      this.charactersFavSubject.next([...currentFavs, character]);
    } catch (error) {
      console.log(error);
      alert('Error');
    }
  }

  addOrRemovefavorite(character: characters): void {
    const { id } = character;
    console.log(id, character);
    const currentFavs = this.getFavoriteCharacters();
    const found = !!currentFavs.find((fav: characters) => fav.id === id);
    found ? this.removeFromfavorite(id) : this.addToFavorite(character);
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES) || '[]');
    if (currents.length === 0) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoriteCharacters();
  }
}
