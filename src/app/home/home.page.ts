import { Component } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date: string = '';
  form: FormGroup;
  minDate: string = '';
  maxDate: string = '';
  dateToday: string = '';
  dateYesterday: string = '';
  tenDays: string = '';
  nextYear: string = '';
  dateValue: any = '';
  showList: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    ) {
      this.form = this.createForm();
      this.minDate = new Date().toISOString()
      this.maxDate = (new Date().getFullYear() + 5).toString();
    }

    createForm(): FormGroup {
      return this.formBuilder.group({
        date: ['', [ Validators.required ]],
      })
    }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd, yyyy');
  }

  onSubmit() {
    this.showList = true;
    this.dateToday = this.formatDate(this.minDate)
    this.dateYesterday = this.formatDate(this.getNewDate(1, true));
    this.tenDays = this.formatDate(this.getNewDate(10, false));
    this.nextYear = this.formatDate(this.getNewDate(366, false));
  }

  getNewDate(days: number, previous: boolean) {
    let d = new Date();
    if(previous){
      d.setDate(d.getDate() - days);
    }else{
      d.setDate(d.getDate() + days);
    }
    return  new Date(d).toISOString();
  };
}
