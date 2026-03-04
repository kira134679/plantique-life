import { addLocalCartItem, deleteLocalCartItem, updateLocalCartItem } from '../slice/cartSlice';

export const cartLocalStorageMiddleware = store => next => action => {
  // 讓 action 通過，交給 Reducer 去更新 Redux state
  const result = next(action);

  // 攔截判斷
  if (
    action.type === addLocalCartItem.type ||
    action.type === updateLocalCartItem.type ||
    action.type === deleteLocalCartItem.type
  ) {
    // 取得最新狀態：從 store 取得剛被 Reducer 更新後的最新購物車資料
    const { cart } = store.getState();

    // 處理副作用：自動同步到 localStorage
    localStorage.setItem('guestCarts', JSON.stringify(cart.carts));
  }

  // 回傳結果（保持 middleware 鏈的正常運作）
  return result;
};
