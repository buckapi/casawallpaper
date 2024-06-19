import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter
){}
ngAfterViewInit(): void {
  window.scrollTo(0, 0);
}
}
