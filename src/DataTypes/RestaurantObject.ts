import { CategoryData } from "./CategoryDataTypes";

export interface RestaurantData {
  id?: string;
  name: string;
  category: CategoryData;
  table: [];
  userUiPreferences: UserUiPreferences;
}
export interface addRestaurantData {
  name: string;
}

export interface UserUiPreferences {
  primaryColor: "";
  secondaryColor: "";
  fontType: "";
  categoryShape: "";
  contactLinks: {
    facebook: "";
    twitter: "";
    instagram: "";
  };
  ingredientViewType: ViewType.GRID;
  itemsViewType: ViewType;
}

export enum ViewType {
  GRID = "GRID",
  LIST = "LIST",
}
