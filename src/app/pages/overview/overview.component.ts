import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})


export class OverviewComponent {
  // Data
  categories = ['Indskoling', 'Udskoling', 'Forældre'];
  names = ['Peter', 'Lone']; 
  rows = [
    { selected: false, personale: 'Peter', elev: 'Indskoling', tidspunkt: '2024-09-05 10:00', type: 'Fysisk', reaktion: '6', konsekvens: 'Ingen', underskrevet: 'Nej' },
  ];
  columns = [];  // Fyld med dine data
  
  // Variabler til ngModel
  selectedDateSort: string = 'desc';  // Standardværdi
  selectedName: string; 
  selectedCategory: string;  

  viewMore(row: any) {
    console.log('Vis mere for:', row);
    // Implementer din logik for at vise mere information om den valgte række
  }

  constructor() {
    this.selectedName = this.names[0];  // Standard til første navn
    this.selectedCategory = this.categories[0];  // Standard til første kategori
  }

}

