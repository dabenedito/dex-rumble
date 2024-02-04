import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../../servicies/web3-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  readonly defultOption = { name: 'Loading...', image: 'https://static.vecteezy.com/ti/vetor-gratis/p2/14300061-icone-de-glifo-de-perfil-de-homem-anonimo-foto-para-documentos-ilustracaoial-vetor.jpg' }

  voting: any;
  now = Date.now();
  option1 = this.defultOption;
  option2 = this.defultOption;
  showVotes = 0;
  message: string;

  constructor(
    private service: Web3Service,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!localStorage.getItem(this.service.walletKey)){
      void this.router.navigate(['/']);
    }

    this.service.getCurrentVoting()
      .then((voting: any) => {
        this.voting = voting;
        this.option1 = this.getOption(voting.option1);
        this.option2 = this.getOption(voting.option2);
      })
      .catch(reason => {
        console.error(reason);
      });
  }

  formatDate(maxDate: bigint): Date {
    return new Date(Number(maxDate) * 1000);
  }

  getOption(option: string): { name: string; image: string } {
    switch(option) {
      case 'Diogo':
        return { name: 'Diogo Andrade', image: 'https://avatars.githubusercontent.com/u/12789424?v=4' };
      case 'Andrade':
        return { name: 'Diogo Andrade', image: 'https://avatars.githubusercontent.com/u/12789424?v=4' };
      default:
        return this.defultOption;
    }
  }

  btnVote2Click() {
    this.message = 'Conectando carteira...';
    this.service.addVote(2)
      .then(() => {
        this.showVotes = 2
        this.message = 'Resultados parciais sujeiros a alterações minuto a minuto';
      })
      .catch(reason => console.error(reason));
  }

  btnVote1Click() {
    this.message = 'Conectando carteira...';
    this.service.addVote(1)
      .then(() => {
        this.showVotes = 1
        this.message = 'Resultados parciais sujeiros a alterações minuto a minuto';
      })
      .catch(reason => console.error(reason));
  }
}
