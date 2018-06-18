import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

}
