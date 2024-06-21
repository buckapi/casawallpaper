import { Component, AfterViewInit, HostListener } from '@angular/core';
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
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter
) {}
toggleMenu(event: MouseEvent) {
  this.menuOpen = !this.menuOpen;
  event.stopPropagation();
}


sendSMS() {
  window.open(`sms:${this.phoneNumber}`, '_self');
}

makeCall() {
  window.open(`tel:${this.phoneNumber}`, '_self');
}

@HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen) {
      const clickedInside = (event.target as HTMLElement).closest('.fab');
      if (!clickedInside) {
        this.menuOpen = false;
      }
    }
  }

ngAfterViewInit(): void {
  window.scrollTo(0, 0);
}
}
