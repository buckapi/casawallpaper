import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
  isFabMenuOpen: boolean = false; // Cambia el nombre aquí

  constructor(
    public global:GlobalService,
    public virtualRouter: virtualRouter
  ){}
  toggleMenu(event: MouseEvent) {
    this.menuOpen = !this.menuOpen;
    event.stopPropagation();
  }

  toggleFabMenu(event: MouseEvent) {
    this.isFabMenuOpen = !this.isFabMenuOpen; // Alterna el estado del menú
    event.stopPropagation(); // Evita que el evento se propague
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
