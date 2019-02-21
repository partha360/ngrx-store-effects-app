import { Action } from '@ngrx/store';
import { Topping } from '../../models/topping.model';
import { LOAD_PIZZAS_FAIL, LOAD_PIZZAS_SUCCESS } from './pizzas.action';

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Success';

export const VISUALISE_TOPPINGS = '[Products] Visualise Toppings';

export class loadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
}

export class loadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

export class loadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: Topping[]) {}
}

export class visualiseToppings implements Action {
  readonly type = VISUALISE_TOPPINGS;
  constructor(public payload: number[]) {}
}

// action types

export type ToppingsAction =
  | loadToppings
  | loadToppingsFail
  | loadToppingsSuccess
  | visualiseToppings;
