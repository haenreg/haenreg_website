import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.scss'
})
export class ViewEventComponent {
/*   events: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  cancelEvent(event: any): void {
    // Implementer logik til at annullere eventet
  }

  approveEvent(event: any): void {
    // Implementer logik til at godkende eventet
  } */

}
