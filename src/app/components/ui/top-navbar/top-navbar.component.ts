import { Component, HostListener } from '@angular/core';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
  constructor(
    public global:GlobalService,
    public virtualRouter: virtualRouter
  ){}
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
      this.menuOpen = false;
    }
  }

}
