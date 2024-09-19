import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScaleComponent } from '../../components/scale/scale.component';
import { YesNoComponent } from '../../components/yes-no/yes-no.component';
import { FieldsComponent } from '../../components/fields/fields.component';
import { DateComponent } from '../../components/date/date.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ScaleComponent,
    YesNoComponent,
    FieldsComponent,
    DateComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  id: string | null = null;
  case: any;

  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.httpService.getData('cases/get-case/' + this.id).subscribe((res) => {
      this.case = res;
      console.log(res);
    });
  }
}
