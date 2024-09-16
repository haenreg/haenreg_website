import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-scale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scale.component.html',
  styleUrl: './scale.component.scss'
})
export class ScaleComponent {
  @Input() initialRating: number = 5; 
  @Input() questionId!: number; 
  @Input() title: string = 'Reaktion'; 
  @Input() description: string = '';

  min: number = 0; 
  max: number = 10;
  currentRating: number = 5;

  ngOnInit() {
    this.currentRating = this.initialRating;  
  }
}
