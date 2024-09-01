import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllProductsByCategoryId,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../services/api/productsCrud";
import { ProductData } from "../../DataTypes/ProductDataTypes";

export interface ProductState {
  productList: ProductData[];
  selectedProduct: ProductData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ProductState = {
  productList: [],
  selectedProduct: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductsByCategoryId(categoryId);
      return { categoryId, products: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    {
      categoryId,
      product,
    }: { categoryId: string | undefined; product: ProductData },
    { rejectWithValue }
  ) => {
    try {
      const response = await addProduct(categoryId, product);
      return { categoryId, product: response };
    } catch (error: any) {
      const errorResponseObject = error.response?.data || {
        message: "An unexpected error occurred",
        details: "Please try again later.",
      };
      return rejectWithValue(errorResponseObject);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (
    { categoryId, productId }: { categoryId: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProductById(categoryId, productId);
      return { categoryId, productId, product: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  }
);

export const modifyProduct = createAsyncThunk(
  "products/modifyProduct",
  async (
    {
      categoryId,
      productId,
      updatedProduct,
    }: {
      categoryId: string | undefined;
      productId: string;
      updatedProduct: ProductData;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProduct(
        categoryId,
        productId,
        updatedProduct
      );
      return { categoryId, productId, product: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating product");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (
    {
      categoryId,
      productId,
    }: { categoryId: string | undefined; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await deleteProduct(categoryId, productId);
      return { categoryId, productId, product: response };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting product");
    }
  }
);

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<ProductData[]>) => {
      state.productList = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductData | null>) => {
      state.selectedProduct = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload);
        state.loading = false;
        state.successMessage = "Product created successfully!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ===
          `A product with the name '${action.meta.arg.product.name}' already exists.`
            ? action.payload?.message
            : "Failed to create product!";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
        state.error = "Failed to fetch product!";
      })
      .addCase(modifyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        state.productList = state.productList.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        state.loading = false;
        state.successMessage = "Product updated successfully!";
      })
      .addCase(modifyProduct.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
        state.error = "Failed to update product!";
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
        state.successMessage = "Product deleted successfully!";
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
        state.error = "Failed to delete product!";
      });
  },
});

export const {
  setProductList,
  setSelectedProduct,
  clearSuccessMessage,
  clearErrorMessage,
} = ProductSlice.actions;

export default ProductSlice.reducer;
