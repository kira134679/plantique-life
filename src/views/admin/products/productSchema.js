import * as z from 'zod';

import { CATEGORY_OPTIONS, STATUS_OPTIONS, UNIT_OPTIONS } from './constants';

// ====================
// --- 通用驗證規則 ---
// ====================

// 下拉選單
const getDropdownRule = options => {
  return z.enum(options, {
    error: issue => {
      if (issue.input === '') return '必填欄位';
      if (issue.code === 'invalid_value') return '不支援此選項';
    },
  });
};

// 價格
const priceRule = z
  .string()
  .min(1, '必填欄位')
  .regex(/^(0|[1-9]\d*)$/, '金額須為正整數或 0')
  .transform(Number); //轉為後端要求的數字型別

//圖片網址
const imageUrlRule = z
  .literal('') // 選填欄位，空字串放行
  .or(
    // 非空字串的判斷
    z.url('網址不符合格式').refine(val => /^https?:\/\//.test(val), '網址開頭須為 http 或 https'),
  );

// 圖片檔案
const imageFileRule = z
  .any()
  // 過濾非 FileList/File/null 的值
  .refine(val => val instanceof FileList || val instanceof File || val === null, {
    error: '無效的檔案格式',
  })
  // 將 FileList/File/null 一律轉換為 File/null
  .transform(val => {
    if (val instanceof FileList)
      return val[0] || null; // 當 FileList.length 為 0 時回傳 null
    else if (val instanceof File) return val;
    else return null;
  })
  // 將 transform 的結果使用 pipe 導到另一個 Schema 進行驗證
  .pipe(
    z.union([
      z.null(), // 選填欄位，可為 null
      z
        .file()
        .max(3_000_000, '檔案須小於 3 MB')
        .mime(['image/jpg', 'image/jpeg', 'image/png'], '僅支援 .jpg, .jpeg, .png 圖檔'),
    ]),
  );

// ========================
//  --- 迴圈產生副圖驗證 ---
// ========================

const imageUrls = {};
Array.from({ length: 5 }).forEach((_, index) => {
  imageUrls[`imageUrl${index + 1}`] = imageUrlRule;
});

const imageFiles = {};
Array.from({ length: 5 }).forEach((_, index) => {
  imageFiles[`imageFile${index + 1}`] = imageFileRule;
});

// =======================
// --- 商品驗證 Schema ---
// =======================
// 將各 Schema 以 .and() 並聯，確保不同邏輯區塊（基礎、價格、圖片）在驗證時互不干涉
// 避免因為其他邏輯區塊報錯而導致後項不執行，利於即時顯示錯誤訊息

// 基礎欄位驗證
const baseSchema = z.object({
  title: z.string().trim().min(1, '必填欄位').max(10, '名稱不可超過 10 個字'),
  category: getDropdownRule(CATEGORY_OPTIONS),
  status: getDropdownRule(STATUS_OPTIONS).transform(val => (val === '啟用' ? 1 : 0)),
  unit: getDropdownRule(UNIT_OPTIONS),
  content: z.string(),
  description: z.string(),
});

// 價格驗證（包含跨欄位）
const priceSchema = z
  .object({
    price: priceRule,
    originPrice: priceRule,
  })
  .refine(data => data.originPrice >= data.price, { error: '售價不可高於原價', path: ['price'] });

// 圖片驗證（包含跨欄位）
const imageSchema = z
  .object({
    mainImageUrl: imageUrlRule,
    ...imageUrls,
    mainImageFile: imageFileRule,
    ...imageFiles,
  })
  .superRefine((data, ctx) => {
    // 主圖必填
    if (data.mainImageFile === null && data.mainImageUrl === '') {
      ctx.addIssue({
        code: 'custom',
        message: '請輸入網址或上傳圖片',
        path: ['mainImageUrl'],
      });
    }
  });

const productSchema = baseSchema.and(priceSchema).and(imageSchema);

export default productSchema;
