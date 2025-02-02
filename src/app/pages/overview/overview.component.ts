import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { TableFilter } from '../../interfaces/iTableFilter';
import { Case } from '../../interfaces/iCase';
import { Question } from '../../interfaces/iQuestion';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { TablePaginationReturn } from '../../interfaces/SearchInterfaces';
import { iUser } from '../../interfaces/iUser';
import { catchError, forkJoin, throwError } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablePaginationComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})


export class OverviewComponent implements OnInit{

  public currentPage: number = 1;
  public totalPages: number = -1;
  public totalItems: number = -1;
  public limit: number = 15;

  public dataRows: Case[] = [];

  public questions: Question[] = [];

  public users: iUser[] = [];
  public status: { value: string, label: string }[] = [
    { value: 'WAITING', label: 'Venter på svar' },
    { value: 'APPROVED', label: 'Godkendt' },
    { value: 'NOT_APPROVED', label: 'Afvist' }
  ];

  public sortField: number | null = null;
  public sortOrder: string = 'ASC';

  public formGroup: FormGroup = undefined;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.createFormGroup();

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
    console.log(row);
    this.router.navigate(['/view-case/' + row.id]);
  }

  createFormGroup() {
    this.formGroup = this.fb.group({
      checkboxes: this.fb.group({}),  // Dynamically add checkboxes here later
      selectedUserId: new FormControl(null),
      caseStatus: new FormControl(null),
    });

    this.formGroup
      .get('selectedUserId')
      ?.valueChanges.subscribe((selectedId) => {
        this.fetchWithParams();
      });

    this.formGroup.get('caseStatus')?.valueChanges.subscribe((caseStatus) => {
      this.fetchWithParams();
    });
  }

  createCheckboxControls() {
    // this.formGroup.get('checkboxes').setValue(this.fb.group({}));
    const checkboxGroup = this.formGroup.get('checkboxes') as FormGroup;

    this.dataRows.forEach((row) => {
      checkboxGroup.addControl(row.id.toString(), this.fb.control(false)); // Add control using the row's ID
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
      limit: 10,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      status: this.formGroup.get('caseStatus').value,
    };

    if (!filterData.userId || filterData.userId.toString() === 'null') {
      delete filterData.userId;
    }

    if (!filterData.status || filterData.status.toString() === 'null') {
      delete filterData.status;
    }

    this.fetchCases(filterData); // Call fetchCases to get the data
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

  disprove() {
    const requests = this.getCheckedCases().map((id) =>
      this.httpService.getData(`cases/disprove-case/${id}`).pipe(
        catchError((error) => {
          console.error(`Error disproving case with id ${id}`, error);
          return throwError(error);
        })
      )
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.fetchWithParams();
      },
      error: (error) => {
        console.error('Error in batch request', error);
      },
    });
  }

  approve() {
    const requests = this.getCheckedCases().map((id) =>
      this.httpService.getData(`cases/approve-case/${id}`).pipe(
        catchError((error) => {
          console.error(`Error approving case with id ${id}`, error);
          return throwError(error);
        })
      )
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.fetchWithParams();
      },
      error: (error) => {
        console.error('Error in batch request', error);
      },
    });
  }

  getCheckedCases(): number[] {
    const checkedCases: number[] = Object.entries(
      this.formGroup.get('checkboxes').value
    )
      .filter(([key, value]) => value === true)
      .map(([key]) => Number(key));

    return checkedCases;
  }
}
