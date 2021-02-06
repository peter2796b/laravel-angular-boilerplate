import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  /**
   * flag to determine if the modal is opened or not
   */
  opened:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
