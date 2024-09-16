import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-yes-no',
  standalone: true,
  imports: [],
  templateUrl: './yes-no.component.html',
  styleUrl: './yes-no.component.scss'
})
export class YesNoComponent {
  @Input() title: string = 'Mulighed for at tilkalde hjælp?';
  @Input() description: string = ''; 
  @Input() answer: string = 'YES'; 
  selectedOption: string = '';

  ngOnInit() {
    this.selectedOption = this.answer;
  }

}
