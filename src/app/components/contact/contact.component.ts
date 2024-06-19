import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
}
