import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as pizzasActions from '../actions/pizzas.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromServices from '../../services';
import { of } from 'rxjs';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(pizzasActions.LOAD_PIZZAS),
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new pizzasActions.loadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzasActions.loadPizzasFail(error)))
      );
    })
  );
}
