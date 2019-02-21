import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class loadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class loadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class loadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

// action types

export type PizzasAction = loadPizzas | loadPizzasFail | loadPizzasSuccess;
