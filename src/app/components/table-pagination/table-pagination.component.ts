import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { TablePaginationReturn } from '../../interfaces/SearchInterfaces';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() totalResults: number = -1;
  @Input() totalPages: number = -1;
  @Input() currentPage: number = 1;
  @Input() limit: number = 15;

  @Output() onPageChange: EventEmitter<TablePaginationReturn> = new EventEmitter();

  paginationForm: FormGroup;
  limitOptions: number[] = [10, 15, 20, 30, 50];

  constructor(private fb: FormBuilder) {
    this.paginationForm = this.fb.group({
      page: [this.currentPage],
      limit: [this.limit],
    });
  }

  ngOnInit(): void {
    this.paginationForm.controls['page'].setValue(this.currentPage);
    this.paginationForm.controls['limit'].setValue(this.limit);

    this.paginationForm.get('page')?.valueChanges.subscribe((newPage: number) => {
      this.changePage(newPage, this.paginationForm.controls['limit'].value);
    });

    this.paginationForm.get('limit')?.valueChanges.subscribe((newLimit: number) => {
      this.changePage(1, newLimit);  // Reset to page 1 when limit changes
    });
  }

  changePage(newPage: number, newLimit: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.limit = newLimit;

      this.paginationForm.controls['page'].setValue(this.currentPage, { emitEvent: false });

      this.onPageChange.emit({ page: this.currentPage, limit: this.limit });
    } else {
      this.paginationForm.controls['page'].setValue(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1, this.limit);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1, this.limit);
    }
  }
}
