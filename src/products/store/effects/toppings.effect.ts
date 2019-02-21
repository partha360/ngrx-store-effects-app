import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as toppingsActions from '../actions/toppings.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromServices from '../../services';
import { of } from 'rxjs';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.pipe(
    ofType(toppingsActions.LOAD_TOPPINGS),
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map(toppings => new toppingsActions.loadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.loadToppingsFail(error)))
      );
    })
  );
}
