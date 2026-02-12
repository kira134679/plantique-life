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
    ...rest
  } = product;

  const imagesUrlObj = {};
  if (imagesUrl) {
    imagesUrl.forEach((url, index) => {
      imagesUrlObj[`imageUrl${index + 1}`] = url;
    });
  }

  return {
    ...rest,
    price: price.toString(),
    originPrice: origin_price.toString(),
    status: is_enabled ? '啟用' : '停用',
    mainImageUrl: imageUrl,
    ...imagesUrlObj,
  };
};

/**
 * 將表單資料轉換為後端 API 要求的 Payload 格式
 * @param {Object} formData - 來自 react-hook-form 的原始資料
 * @param {boolean} isEditMode - 是否為編輯模式
 * @returns {Object} 包含 data 屬性的後端 Payload
 */
export const formatToPayload = formData => {
  // 將需要重新命名 name 的值、不需要進後端的值解構出來，其它已經正確的裝到 rest
  const {
    status,
    originPrice,
    mainImageUrl,
    imageUrl1,
    imageUrl2,
    imageUrl3,
    imageUrl4,
    imageUrl5,
    // 圖片檔案不送給後端
    mainImageFile: _mainImageFile,
    imageFile1: _imageFile1,
    imageFile2: _imageFile2,
    imageFile3: _imageFile3,
    imageFile4: _imageFile4,
    imageFile5: _imageFile5,
    ...rest
  } = formData;

  return {
    data: {
      ...rest,
      origin_price: originPrice,
      is_enabled: status,
      imageUrl: mainImageUrl,
      imagesUrl: [imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5].filter(Boolean), //空字串不送給後端
    },
  };
};
