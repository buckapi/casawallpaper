import { Component, AfterViewInit } from '@angular/core';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter
) {}
ngAfterViewInit(): void {
  window.scrollTo(0, 0);
}
}
