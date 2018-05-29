import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  fillerNav = Array(10).fill(0).map((_, i) => `Aufgabe  ${i + 1}`);
  name: string;
  passwort: string;
  constructor(public dialog: MatDialog) {
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

  onClick() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


