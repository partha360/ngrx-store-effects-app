import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';
import * as fromToppsings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppsings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppsings.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
