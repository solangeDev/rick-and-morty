import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  //para detectar cuando la propiedad character cambie
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCardComponent implements OnInit {
  @Input() character: any;
  constructor(private localStorageSvc: LocalStorageService) {}
  //void es que no devolvera nada el metodo
  toggleFavorite(): void {
    console.log('aqui')
    const isFavorite = this.character.isFavorite;
    this.getIcon;
    this.character.isFavorite = !this.character.isFavorite;
    this.localStorageSvc.addOrRemovefavorite(this.character);
  }
  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
  ngOnInit(): void {}
}
