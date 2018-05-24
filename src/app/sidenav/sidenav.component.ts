import {Component} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  fillerNav = Array(20).fill(0).map((_, i) => `Aufgabe  ${i + 1}`);

  onClick() {
  }
}

