import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  fillerNav = Array(20).fill(0).map((_, i) => `Aufgabe  ${i + 1}`);
  name: string;
  passwort: string;
  constructor(public dialog: MatDialog) {
  }

  onClick() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

