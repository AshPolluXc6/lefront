import { Injectable } from '@angular/core';

@Injectable({
    providedIn : "root",
})


export class AnswerStandard{
  success?: number |0;
  message?: string | any;
  result?: [] | any;
  error?: string | any;
  sql ?: string | '';
  audit ?: {} | any;
  inconsistency ?: {}|any;
  count?: {}|any;
  data?: {}|any;
}