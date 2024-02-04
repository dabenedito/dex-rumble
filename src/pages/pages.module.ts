import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from "./home/home.component";
import { VoteComponent } from "./vote/vote.component";
import { Web3Service } from "../servicies/web3-service";

@NgModule({
  declarations: [
    HomeComponent,
    VoteComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    Web3Service,
  ]
})
export class PagesModule { }
