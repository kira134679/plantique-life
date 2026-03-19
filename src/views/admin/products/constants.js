// --- 商品基本設定 ---
// 商品表格下拉選單欄位
export const CATEGORY_OPTIONS = ['植栽單品', '療癒組盆', '客製禮盒', '配件商品'];
export const STATUS_OPTIONS = ['啟用', '停用'];
export const UNIT_OPTIONS = ['個', '件', '盒', '包', '組'];

// 欄位字數限制
export const PRODUCT_TITLE_MAX_LENGTH = 8;
export const PRODUCT_EN_NAME_MAX_LENGTH = 30;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 400;

// --- 商品內容物設定 ---
// 定義於此對照表中的類別，即具備「內容物設定」功能
export const BUNDLE_LABEL_MAP = {
  療癒組盆: '組盆', // 類別名稱對照類別前綴
  客製禮盒: '禮盒',
  配件商品: '配件',
};

export const MAX_BUNDLE_COUNT = 5;

// 欄位字數限制
export const BUNDLE_TITLE_MAX_LENGTH = 8;
export const BUNDLE_EN_NAME_MAX_LENGTH = 30;
export const BUNDLE_DESCRIPTION_MAX_LENGTH = 200;

// --- 錯誤提示訊息設定 ---
export const IMAGE_UPLOAD_REMIND_MESSAGE = '請點擊「確認上傳」按鈕'; // 已選擇圖片但未點擊確認上傳
