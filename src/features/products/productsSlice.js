import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [
      { id: 0, title: "PRODUCT01", amount: 10, avgPrice: 83.39, emailList: [] },
      { id: 1, title: "PRODUCT02", amount: 30, avgPrice: 78.83, emailList: [] },
      { id: 2, title: "PRODUCT03", amount: 20, avgPrice: 56.03, emailList: [] },
    ],
    productId: null,
  },
  reducers: {
    setId: (state, action) => {
      state.productId = parseInt(action.payload.id);
    },

    add: (state, action) => {
      const newProducts = state.products.map((product) => {
        if (product.id === state.productId) {
          const amount = product.amount + parseInt(action.payload.amount);
          const avgPrice = product.avgPrice - product.avgPrice * 0.01;
          return { ...product, amount, avgPrice };
        } else {
          return product;
        }
      });

      return { ...state, products: newProducts };
    },

    remove: (state, action) => {
      const newProducts = state.products.map((product) => {
        if (product.id === state.productId) {
          if (product.emailList.includes(action.payload.email)) {
            alert("Email already used please buy with another email");
            return product;
          } else {
            if (product.amount >= action.payload.amount) {
              const amount = product.amount - parseInt(action.payload.amount);
              const avgPrice = product.avgPrice + product.avgPrice * 0.01;
              const emailList = [
                ...product.emailList,
                action.payload.email.toLowerCase(),
              ];
              alert(
                `${
                  action.payload.amount === 1
                    ? ` 1 item of ${product.title} shipped successfully`
                    : ` ${action.payload.amount} items of ${product.title} shipped successfully`
                }`
              );
              return { ...product, amount, avgPrice, emailList };
            } else {
              alert(
                `There is not enough ${product.title} to buy. You can buy the remaining amount of ${product.amount} items`
              );
              return product;
            }
          }
        } else {
          return product;
        }
      });

      return { ...state, products: newProducts };
    },
  },
});

export const { add, remove, setId } = productsSlice.actions;

export default productsSlice.reducer;
