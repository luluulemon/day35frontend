import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Connectable, lastValueFrom } from 'rxjs';
import { Game } from '../models/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnChanges{
  
  constructor(private gameSvc:GameService){}
  
  games: Game[] = []
  offset: number = 0;

  @Input() viewPerPage!: number


  ngOnChanges(changes: SimpleChanges){
    console.info(changes)
   
    // this.gameSvc.getGames(this.viewPerPage, this.offset).subscribe((resp)=> {
    //   console.log(resp);  
    // this.games = resp;
    // })

    // Top -> Using observable.subscribe, Bottom (use Promise) -> Using lastValueFrom(observable).then()
    lastValueFrom (this.gameSvc.getGames(this.viewPerPage,this.offset) )
        .then((result) => this.games = result)
        //.catch((error) => console.info(error));
        
    
  }

  previous(){
    if(this.offset > 0)
    {
      this.offset -= this.viewPerPage
      console.info("check offset: ", this.offset)
      this.gameSvc.getGames(this.viewPerPage, this.offset).subscribe((resp)=> {
        console.log(resp);  
      this.games = resp;
      })
    }
  }

  next(){
    this.offset += this.viewPerPage
    this.gameSvc.getGames(this.viewPerPage, this.offset).subscribe((resp)=> {
      console.log(resp);  
    this.games = resp;
    })
  }
}
