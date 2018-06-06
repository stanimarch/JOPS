import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {HeaderArray, MenuService} from '../menu/menu.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers: []
})
export class SidenavComponent {
  panelOpenState: boolean;
  menuData: Array<HeaderArray>;

  constructor(public dialog: MatDialog,
              private jopsApiRunService: JopsApiRunService,
              private jopsApiLoginService: JopsApiLoginService,
              private menuService: MenuService) {
    if (localStorage.getItem('sessionId') === null ||
      localStorage.getItem('sessionId') === undefined ||
      localStorage.getItem('matrNr') === null ||
      localStorage.getItem('matrNr') === undefined) {
      this.panelOpenState = true;
      // this.openDialog();                         // ################################## auskommentieren, um Loginfenster zu bekommen
      this.menuData = this.menuService.getData();
    }
  }


  onClickHaupt() {
    document.getElementById('start').style.display = 'block';
    document.getElementById('mitte').style.display = 'none';
    document.getElementById('impressum').style.display = 'none';
  }

  onClickAufg() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('mitte').style.display = 'block';
    document.getElementById('impressum').style.display = 'none';
  }

  onClickImp() {
    document.getElementById('impressum').style.display = 'block';
    document.getElementById('mitte').style.display = 'none';
    document.getElementById('start').style.display = 'none';
  }

  onClick(id: number) {
    console.log(id);
  }

  openDialog(): void {
    this.dialog.open(DialogOverviewComponent, {
      width: '250px'
    });
  }

  doLogout() {
    this.jopsApiLoginService.logout();
    this.openDialog();
  }
}
