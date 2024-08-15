import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../DataTypes/RestaurantObject";
import {
  createRestaurant as apiCreateRestaurant,
  updateRestaurant as apiUpdateRestaurant,
  deleteRestaurant as apiDeleteRestaurant,
  getAllRestaurantsByUserId as apiFetchRestaurants,
} from "../../services/api/restaurantCrud";

export interface RestaurantState {
  restaurantList: RestaurantData[];
  selectedRestaurant: any;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: RestaurantState = {
  restaurantList: [],
  selectedRestaurant: {},
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchAllRestaurants = createAsyncThunk(
  "restaurants/fetchAllRestaurants",
  async ({ userID }: { userID: string }, { rejectWithValue }) => {
    try {
      const response = await apiFetchRestaurants(userID);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching restaurants"
      );
    }
  }
);

export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (
    { restaurant }: { restaurant: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiCreateRestaurant(restaurant);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding restaurant");
    }
  }
);

export const editRestaurant = createAsyncThunk(
  "restaurants/editRestaurant",
  async (
    { restaurant }: { restaurant: RestaurantData },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiUpdateRestaurant(restaurant, restaurant.id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error editing restaurant"
      );
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async ({ restaurantId }: { restaurantId: string }, { rejectWithValue }) => {
    try {
      await apiDeleteRestaurant(restaurantId);
      return restaurantId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error deleting restaurant"
      );
    }
  }
);

export const RestaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurantList: (state, action: PayloadAction<RestaurantData[]>) => {
      state.restaurantList = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<any>) => {
      state.selectedRestaurant = action.payload;
    },
    clearSuccessMessage: (state, action: PayloadAction<any>) => {
      state.successMessage = action.payload;
    },
    clearErrorMessage: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.restaurantList = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurantList.push(action.payload);
        state.loading = false;
        state.successMessage = "Restaurant created successfully!";
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload.message || action.payload;
      })
      .addCase(editRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(editRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        );
        state.loading = false;
        state.successMessage = "Restaurant updated successfully!";
      })
      .addCase(editRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurantList = state.restaurantList.filter(
          (restaurant) => restaurant.id !== action.payload
        );
        state.loading = false;
        state.successMessage = "Restaurant deleted successfully!";
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setRestaurantList,
  setSelectedRestaurant,
  clearSuccessMessage,
  clearErrorMessage,
} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
