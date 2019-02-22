import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as pizzasActions from '../actions/pizzas.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromServices from '../../services';
import { of, from } from 'rxjs';
import * as fromRoot from '../../../app/store';
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
        map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.pipe(
    ofType(pizzasActions.CREATE_PIZZA),
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.createPizza(pizza).pipe(
        map(pizza => new pizzasActions.CreatePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.pipe(
    ofType(pizzasActions.CREATE_PIZZA_SUCCESS),
    map((action: pizzasActions.CreatePizzaSuccess) => action.payload),
    map(
      pizza =>
        new fromRoot.Go({
          path: ['/products', pizza.id]
        })
    )
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(
    ofType(pizzasActions.UPDATE_PIZZA),
    map((action: pizzasActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(pizza => new pizzasActions.UpdatePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.pipe(
    ofType(pizzasActions.REMOVE_PIZZA),
    map((action: pizzasActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => new pizzasActions.RemovePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.RemovePizzaFail(error)))
      );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$.pipe(
    ofType(
      pizzasActions.UPDATE_PIZZA_SUCCESS,
      pizzasActions.REMOVE_PIZZA_SUCCESS
    ),
    map(
      () =>
        new fromRoot.Go({
          path: ['/products']
        })
    )
  );
}
