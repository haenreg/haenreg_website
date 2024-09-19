import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() time: string = '';

  dateObject: Date | null = null; // Holds the converted Date object
  formattedDate: string = ''; // Holds the formatted date string (e.g., "MM/DD/YYYY")
  formattedTime: string = ''; // Holds the formatted time string (e.g., "17:30")

  ngOnInit(): void {
    if (this.time) {
      // Convert the string to a Date object
      this.dateObject = new Date(this.time);

      this.formattedDate = this.dateObject.toLocaleDateString();

      // Format the time as a string (e.g., "HH:mm")
      this.formattedTime = this.dateObject.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }
}
