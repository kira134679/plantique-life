import { BUNDLE_LABEL_MAP, MAX_BUNDLE_COUNT } from './constants';

/**
 * 將後端商品原始資料轉換為表單格式
 * @param {Object} product - 來自 API 的產品資料
 * @returns {Object} 套用至 react-hook-form 的格式化物件
 */
export const formatToForm = product => {
  if (!product) return null;

  const {
    // 僅將需要進表單的值解構出來
    title = '',
    category = '',
    origin_price = '',
    price = '',
    unit = '',
    is_enabled = 0,
    imageUrl = '',
    imagesUrl,
    description,
    content,
  } = product;

  // 將 imagesUrl 陣列攤平為物件
  const imagesUrlObj = {};
  if (Array.isArray(imagesUrl)) {
    imagesUrl.slice(0, 5).forEach((url, index) => {
      imagesUrlObj[`imageUrl${index + 1}`] = typeof url === 'string' ? url : '';
    });
  }

  const { enName = '', imageUrl: introImageUrl1 = '', description: productDescription = '' } = description || {};
  const { bundle, imageUrl: introImageUrl2 = '' } = content || {};

  return {
    // 將所有欄位明確列出，以防有非預期值進入表單
    title,
    enName,
    category,
    status: is_enabled ? '啟用' : '停用',
    description: productDescription,
    originPrice: origin_price === null || origin_price === undefined ? '' : origin_price.toString(),
    price: price === null || price === undefined ? '' : price.toString(),
    unit,
    bundle: bundle || [],
    mainImageUrl: imageUrl,
    ...imagesUrlObj,
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
  // 僅將需要進後端的值解構出來
  const {
    title,
    enName,
    category,
    status,
    originPrice,
    price,
    unit,
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
  } = formData;

  // bundle 清洗
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
    // 將所有欄位明確列出，以防有更換資料結構導致的舊欄位殘留
    data: {
      title,
      category,
      origin_price: originPrice,
      price,
      unit,
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
