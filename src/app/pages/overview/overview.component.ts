import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpService } from '../../services/http.service';
import { TableFilter } from '../../interfaces/iTableFilter';
import { Case } from '../../interfaces/iCase';
import { Question } from '../../interfaces/iQuestion';
import { TablePaginationComponent } from "../../components/table-pagination/table-pagination.component";
import { TablePaginationReturn } from '../../interfaces/SearchInterfaces';
import { iUser } from '../../interfaces/iUser';

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
  public limit: number = 15;

  public dataRows: Case[] = [];

  public questions: Question[] = [];

  public users: iUser[] = [];

  public sortField: number | null = null;
  public sortOrder: string = 'ASC';
  
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
      limit: 2
    };

    this.fetchCases(filterData);

    this.httpService.getData('questions/get-questions').subscribe(
      (response) => {
        this.questions = response;
      }, (error) => {
        console.error('Error fetching questions!', error);
      }
    );

    this.httpService.getData('users/get-all').subscribe(
      (response) => {
        this.users = response;
      }, (error) => {
        console.error('Error fetching users!', error);
      }
    );
  }

  viewMore(row: any) {
    console.log('Vis mere for:', row);
    // Implementer din logik for at vise mere information om den valgte række
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      checkboxes: this.fb.group({}),  // Dynamically add checkboxes here later
      selectedUserId: new FormControl(null),  // Default to 'All Users' (null)
    });

    // Listen to changes in selectedUserId to fetch cases
    this.formGroup.get('selectedUserId')?.valueChanges.subscribe(selectedId => {
      if (selectedId === null) {
        console.log("Fetching cases for all users...");
      } else {
        console.log(`Fetching cases for user with ID: ${selectedId}`);
      }
      this.fetchWithParams(selectedId); // Fetch cases based on selected user
    });
  }

  createCheckboxControls() {
    // this.formGroup.get('checkboxes').setValue(this.fb.group({}));
    const checkboxGroup = this.formGroup.get('checkboxes') as FormGroup;

    this.dataRows.forEach((row) => {
      checkboxGroup.addControl(row.id.toString(), this.fb.control(false));  // Add control using the row's ID
    });
  }

  onClickPrint() {
    console.log(this.formGroup.get('checkboxes').value);
  }

  paginate(pagination: TablePaginationReturn) {
    this.limit = +pagination.limit;
    this.currentPage = pagination.page;
    this.fetchWithParams();
  }

  fetchWithParams(selectedUserId?: number | null) {
    const filterData: TableFilter = {
      userId: this.formGroup.get('selectedUserId').value,
      page: this.currentPage,
      limit: 10,  // Adjust this as needed
      sortField: this.sortField,
      sortOrder: this.sortOrder
    };

    if (!filterData.userId || filterData.userId.toString() === 'null') {
      delete filterData.userId;
    }

    this.fetchCases(filterData);  // Call fetchCases to get the data
  }

  fetchCases(filterData: TableFilter) {
    this.httpService.postData('cases/get-all-cases', filterData).subscribe(
      (response) => {
        const data = response;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.dataRows = data.data as Case[];

        // Now update checkboxes based on fetched cases
        this.updateCheckboxes();
      },
      (error) => {
        console.error('Error fetching cases:', error);
      }
    );
  }

  updateCheckboxes() {
    const checkboxGroup = this.formGroup.get('checkboxes') as FormGroup;

    Object.keys(checkboxGroup.controls).forEach(key => {
      checkboxGroup.removeControl(key);
    });

    this.dataRows.forEach(row => {
      checkboxGroup.addControl(row.id.toString(), new FormControl(false));  // Default unchecked
    });

    this.formGroup.patchValue({ checkboxes: checkboxGroup.value }, { emitEvent: false });
  }

  sortByQuestion(question: any) {
    if (this.sortField === question.id) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      // If a new question is clicked, set the sortField and reset sortOrder to ASC
      this.sortField = question.id;
      this.sortOrder = 'ASC';
    }
    
    this.fetchWithParams();
  }
}

