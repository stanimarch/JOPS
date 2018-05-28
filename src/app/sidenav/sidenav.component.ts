import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  fillerNav = Array(20).fill(0).map((_, i) => `Aufgabe  ${i + 1}`);
  username: string;
  password: string;

  constructor(public dialog: MatDialog,
              private jopsApiService: JopsApiLoginService) {
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

  doPostLogin(): void {
    this.jopsApiService.doPostTestServer();
  }
}

