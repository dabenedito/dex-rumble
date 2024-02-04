import { Component } from '@angular/core';
import { Web3Service } from "../../servicies/web3-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  message: string;

  constructor(
    private web3Service: Web3Service,
    private router: Router,
  ) {}

  btnLogin(): void {
    this.web3Service.doLogin()
      .then(() => void this.router.navigate(['vote']))
      .catch(reason => {
        console.error(reason);
        this.message = reason.me;
      });
  }
}
