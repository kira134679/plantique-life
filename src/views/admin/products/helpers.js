import { BUNDLE_LABEL_MAP, MAX_BUNDLE_COUNT } from './constants';

/**
 * 將後端商品原始資料轉換為表單格式
 * @param {Object} product - 來自 API 的產品資料
 * @returns {Object} 套用至 react-hook-form 的格式化物件
 */
export const formatToForm = product => {
  if (!product) return;

  const {
    id: _id = '', // id 不進表單
    origin_price = 0,
    price = 0,
    is_enabled = 0,
    imageUrl = '',
    imagesUrl,
    content = {},
    description = {},
    ...rest
  } = product;

  const imagesUrlObj = {};
  if (imagesUrl && imagesUrl.length) {
    imagesUrl.slice(0, 5).forEach((url, index) => {
      imagesUrlObj[`imageUrl${index + 1}`] = url;
    });
  }

  const { enName, imageUrl: introImageUrl1, description: productDescription } = description;
  const { bundle, imageUrl: introImageUrl2 } = content;

  return {
    ...rest,
    price: price.toString(),
    originPrice: origin_price.toString(),
    status: is_enabled ? '啟用' : '停用',
    mainImageUrl: imageUrl,
    ...imagesUrlObj,
    enName,
    description: productDescription,
    bundle,
    introImageUrl1,
    introImageUrl2,
  };
};

/**
 * 將表單資料轉換為後端 API 要求的 Payload 格式
 * @param {Object} formData - 來自 react-hook-form 的原始資料
 * @returns {Object} 包含 data 屬性的後端 Payload
 */
export const formatToPayload = formData => {
  // 將需要重新命名 name 的值、需要重新組合與驗證的值、不需要進後端的值解構出來，其它已經正確的裝到 rest
  const {
    title,
    enName,
    category,
    status,
    originPrice,
    description,
    bundle,
    mainImageUrl,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    imageUrl4,
    imageUrl5,
    introImageUrl1,
    introImageUrl2,

    // --- 圖片檔案不送給後端 ---
    mainImageFile: _mainImageFile,
    imageFile1: _imageFile1,
    imageFile2: _imageFile2,
    imageFile3: _imageFile3,
    imageFile4: _imageFile4,
    imageFile5: _imageFile5,
    introImageFile1: _introImageFile1,
    introImageFile2: _introImageFile2,

    ...rest
  } = formData;

  // bundle 驗證
  const getCleanBundle = bundle => {
    const canHaveBundle = !!BUNDLE_LABEL_MAP[category];
    if (!canHaveBundle) return [];

    return bundle
      .filter(
        item => Object.values(item).some(value => value.trim() !== ''), // 過濾掉欄位內容全為空的 item
      )
      .slice(0, MAX_BUNDLE_COUNT);
  };

  return {
    data: {
      ...rest,
      title,
      category,
      origin_price: originPrice,
      is_enabled: status,
      imageUrl: mainImageUrl,
      imagesUrl: [imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5].filter(Boolean), //空字串不送給後端

      // --- 商品名稱、商品描述、商品介紹圖 1 ---
      // 對應前台商品詳細頁，介紹 tab 的上半部
      description: {
        imageUrl: introImageUrl1,
        title,
        enName,
        description,
      },

      // --- 內容物名稱、內容物描述、商品介紹圖 2 ---
      // 對應前台商品詳細頁，介紹 tab 的下半部
      content: {
        imageUrl: introImageUrl2,
        bundle: getCleanBundle(bundle),
      },
    },
  };
};
