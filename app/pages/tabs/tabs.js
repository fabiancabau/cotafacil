import {Page} from 'ionic-angular';
import {Cotacao} from '../cotacao/cotacao';
import {Configuracoes} from '../configuracoes/configuracoes';
import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Cotacao;
    this.tab2Root = Configuracoes;
    this.tab3Root = Page3;
  }
}
