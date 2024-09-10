import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpService } from '../../services/http.service';
import { TableFilter } from '../../interfaces/iTableFilter';
import { Case } from '../../interfaces/iCase';
import { Question } from '../../interfaces/iQuestion';
import { TablePaginationComponent } from "../../components/table-pagination/table-pagination.component";
import { TablePaginationReturn } from '../../interfaces/SearchInterfaces';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TablePaginationComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})

export class OverviewComponent implements OnInit{
  // Data
  categories = ['Indskoling', 'Udskoling', 'Forældre'];
  names = ['Peter', 'Lone']; 
  rows = [
    { selected: false, personale: 'Peter', elev: 'Indskoling', tidspunkt: '2024-09-05 10:00', type: 'Fysisk', reaktion: '6', konsekvens: 'Ingen', underskrevet: 'Nej' },
  ];
  columns: any[] = [];  // Fyld med dine data

  public currentPage: number = 1;
  public totalPages: number = -1;
  public totalItems: number = -1;

  public dataRows: Case[] = [];

  public questions: Question[] = [];
  
  // Variabler til ngModel
  selectedDateSort: string = 'desc';  // Standardværdi
  selectedName: string = '';
  selectedCategory: string = '';

  public formGroup: FormGroup = undefined;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.selectedName = this.names[0];  // Standard til første navn
    this.selectedCategory = this.categories[0];  // Standard til første kategori

    const filterData: TableFilter = {
      page: 1,
      limit: 10
    };

    this.httpService.postData('cases/get-all-cases', filterData).subscribe(
      (response) => {
        const data = response;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.dataRows = data.data as Case[];
        console.log(this.dataRows);
        this.createFormGroup();
      },
      (error) => {
        console.error('Error fetching cases:', error);
      }
    );

    this.httpService.getData('questions/get-questions').subscribe(
      (response) => {
        this.questions = response;
        console.log(this.questions);
      }, (error) => {
        console.error('Error fetching questions!', error);
      }
    );
  }

  viewMore(row: any) {
    console.log('Vis mere for:', row);
    // Implementer din logik for at vise mere information om den valgte række
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      checkboxes: this.fb.group({})
    });

    this.createCheckboxControls();
  }

  createCheckboxControls() {
    const checkboxGroup = this.formGroup.get('checkboxes') as FormGroup;

    this.dataRows.forEach((row) => {
      checkboxGroup.addControl(row.id.toString(), this.fb.control(false));  // Add control using the row's ID
    });
  }

  onClickPrint() {
    console.log(this.formGroup.get('checkboxes').value);
  }

  fetchCases(pagination: TablePaginationReturn) {
    console.log(pagination);
  }

}

