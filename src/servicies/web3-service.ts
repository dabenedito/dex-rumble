import { Injectable } from '@angular/core';
import Web3 from "web3";
import ABI from '../assets/json/ABI.json';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  readonly walletKey = 'wallet';
  readonly contractAdress = '0x548056cab012B6c8689653c8Fe47dA23A08A4e16'

  async doLogin(): Promise<string> {
    const { ethereum } = window;

    if(!ethereum) {
      throw new Error ('No MEtamask found.');
    }

    const web3 = new Web3(ethereum);
    const accounts = await web3.eth.requestAccounts();

    if (!accounts?.length) {
      throw new Error ('Wallet not found/allowed.');
    }

    localStorage.setItem(this.walletKey, accounts[0]);
    return accounts[0];
  }

  async getCurrentVoting() {
    const contract = this.getContract();
    // @ts-ignore - TODO: Arrumar uma forma de corrigir a forma que é chamada a função
    return contract.methods.getCurrentVoting().call();
  }

  async addVote(choice: number) {
    const contract = this.getContract();
    // @ts-ignore - TODO: Arrumar uma forma de corrigir a forma que é chamada a função
    return contract.methods.addVote(choice.toString()).send();
  }

  private getContract() {
    const wallet = localStorage.getItem(this.walletKey);
    if (!wallet) {
      throw new Error('Unalthenticated');
    }

    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, this.contractAdress, { from: wallet });
  }
}
