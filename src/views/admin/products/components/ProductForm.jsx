import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { memo, useCallback, useEffect, useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

import {
  CATEGORY_OPTIONS,
  IMAGE_UPLOAD_REMIND_MESSAGE,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_EN_NAME_MAX_LENGTH,
  PRODUCT_TITLE_MAX_LENGTH,
  STATUS_OPTIONS,
  UNIT_OPTIONS,
} from '../constants';
import { formatToPayload } from '../helpers';
import productSchema from '../productSchema';

import Button from '@/components/Button';
import BundleSection from './BundleSection';
import RhfInputWithCounter from './RhfInputWithCounter';
import RhfTextareaWithCounter from './RhfTextareaWithCounter';
import UploadImageCard from './UploadImageCard';

const DEFAULT_INITIAL_DATA = {}; // 避免元件重新渲染時，重複產生不同參考位址的空物件，導致無限迴圈

const EMPTY_DEFAULT_VALUES = {
  title: '',
  enName: '',
  category: '',
  status: '',
  description: '',
  originPrice: '',
  price: '',
  unit: '',
  bundle: [],
  mainImageUrl: '',
  imageUrl1: '',
  imageUrl2: '',
  imageUrl3: '',
  imageUrl4: '',
  imageUrl5: '',
  introImageUrl1: '',
  introImageUrl2: '',
  mainImageFile: null,
  imageFile1: null,
  imageFile2: null,
  imageFile3: null,
  imageFile4: null,
  imageFile5: null,
  introImageFile1: null,
  introImageFile2: null,
};

function ProductForm({ isEditMode, onSubmit, initialData: formattedInitialData, productId = '' }) {
  const initialData = formattedInitialData || DEFAULT_INITIAL_DATA;

  // --- Logic Helpers ---
  // 依照新增模式/編輯模式產生不同的欄位 id 前綴
  const fieldIdPrefix = isEditMode ? 'update-product' : 'new-product';

  const getFieldId = useCallback(
    name => {
      return `${fieldIdPrefix}-${name}`;
    },
    [fieldIdPrefix],
  );

  // --- React Hook Form ---
  const methods = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    shouldFocusError: false,
    // 所有欄位都需要有預設值，否則 reset 時會變成 undefined 而非字串型別，無法通過 zod 驗證
    defaultValues: {
      ...EMPTY_DEFAULT_VALUES,
    },
  });
  const {
    control,
    register,
    handleSubmit,
    setFocus,
    getValues,
    trigger,
    setError,
    reset,
    formState: { errors, isDirty },
  } = methods;

  // 即時監測 url 欄位是否有值，計算出目前有多少圖片欄位已使用（不含未上傳至後端的圖片）
  // 若圖片檔案已上傳後端，後端回傳的圖片網址會存入 url 欄位
  const imageUrls = useWatch({ control, name: ['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4', 'imageUrl5'] });
  const usedImageCount = imageUrls.filter(Boolean).length;

  // --- Local State ---
  const [isIdCopied, setIsIdCopied] = useState(false);

  // --- Event Handlers ---
  const handleFormSubmit = formData => {
    if (!formData) return;

    // 驗證是否有已選擇但未上傳的圖片
    const checkImageStatus = (urlFieldName, fileFieldName) => {
      const hasUrl = getValues(urlFieldName) !== '';
      const hasFile = getValues(fileFieldName) !== null;

      if (!hasUrl && hasFile) {
        setError(fileFieldName, {
          type: 'manual',
          message: IMAGE_UPLOAD_REMIND_MESSAGE,
        });
        return false;
      }
      return true;
    };

    // 檢查主圖
    const isMainPassed = checkImageStatus('mainImageUrl', 'mainImageFile');
    // 檢查介紹圖片
    const isIntrosPassed = Array.from({ length: 2 })
      .map((_, index) => checkImageStatus(`introImageUrl${index + 1}`, `introImageFile${index + 1}`))
      .every(value => value === true);
    // 檢查副圖
    const isOthersPassed = Array.from({ length: 5 })
      .map((_, index) => checkImageStatus(`imageUrl${index + 1}`, `imageFile${index + 1}`))
      .every(value => value === true);

    if (isMainPassed && isIntrosPassed && isOthersPassed) {
      const data = formatToPayload(formData);

      // 觸發父元件的函式
      onSubmit(data);
    }
  };

  const handleCopyId = async () => {
    if (isIdCopied) return;
    try {
      await navigator.clipboard.writeText(productId);
      toast.success('商品 ID 複製成功！');
      setIsIdCopied(true);
    } catch {
      toast.error('複製失敗！');
    }
  };

  const handleOriginPriceChange = () => {
    if (getValues('price') === '') return; // 避免還未填入 price 時，即跳出錯誤訊息
    trigger('price'); // 當 originPrice 有變更時，同步進行 price 的驗證，避免錯誤訊息殘留
  };

  // --- Side Effects ---
  // 當傳入的 initialData 有變動時，重新定義表單初始值
  useEffect(() => {
    reset({
      ...EMPTY_DEFAULT_VALUES,
      ...initialData, // 更新商品時，用初始值已經有的屬性去覆蓋掉空的預設值
    });
  }, [initialData, reset]);

  // 元件 mount 時，即 focus 在商品名稱欄位
  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  // 當商品 ID 被複製時，自動計時 3 秒再回復為未複製狀態
  // 當新計時器產生或元件 unmount 時，自動回收計時器
  useEffect(() => {
    if (!isIdCopied) return;

    const timerId = setTimeout(() => {
      setIsIdCopied(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isIdCopied]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* 基本設定 */}
        <section className="py-6 border border-2 p-6 mb-10">
          <h3 className="h4 mb-8 text-primary-700">基本設定</h3>
          {/* 商品 ID */}
          {isEditMode ? (
            <div className="mb-3 w-50 pe-3">
              <label className="form-label text-neutral-700 fs-7" htmlFor="product-id">
                商品 ID
              </label>
              <div className="position-relative input-group-copy">
                <input id="product-id" className="form-control pe-8" type="text" value={productId} readOnly />
                <button
                  type="button"
                  tabIndex="0"
                  className="position-absolute btn border-0 p-1 me-1 btn-copy"
                  onClick={handleCopyId}
                  disabled={isIdCopied}
                >
                  <span className="material-symbols-rounded d-block fs-6">{isIdCopied ? 'check' : 'content_copy'}</span>
                </button>
              </div>
            </div>
          ) : null}
          <div className="d-flex gap-6">
            {/* 商品名稱 */}
            <div className="mb-3 w-50">
              <RhfInputWithCounter
                fieldName="title"
                isRequired={true}
                labelText="商品名稱"
                maxTextLength={PRODUCT_TITLE_MAX_LENGTH}
                id={getFieldId('title')}
                type="text"
                placeholder="請輸入商品名稱"
                {...register('title')}
              />
            </div>
            {/* 商品英文名 */}
            <div className="mb-3 w-50">
              <RhfInputWithCounter
                fieldName="enName"
                labelText="商品英文名"
                maxTextLength={PRODUCT_EN_NAME_MAX_LENGTH}
                id={getFieldId('en-name')}
                type="text"
                placeholder="請輸入商品英文名"
                {...register('enName')}
              />
            </div>
          </div>
          <div className="d-flex gap-6">
            {/* 商品類別 */}
            <div className="mb-3 w-50">
              <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('category')}>
                類別<span className="text-danger">*</span>
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    className={clsx('checkout-dropdown', errors.category && 'zod-validated is-invalid')}
                    onSelect={onChange}
                  >
                    <Dropdown.Toggle
                      className={clsx(
                        'btn bg-transparent border w-100 text-start fs-sm fs-lg-8',
                        errors.category && 'is-invalid',
                        value && 'text-neutral-700',
                        !value && 'text-neutral-500',
                      )}
                      id={getFieldId('category')}
                    >
                      {value || '請選擇商品類別'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      {CATEGORY_OPTIONS.map((option, index) => (
                        <Dropdown.Item as="button" type="button" eventKey={option} key={index}>
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              ></Controller>
              {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
            </div>
            {/* 商品狀態 */}
            <div className="mb-3 w-50">
              <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('status')}>
                狀態<span className="text-danger">*</span>
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    className={clsx('checkout-dropdown', errors.status && 'zod-validated is-invalid')}
                    onSelect={onChange}
                  >
                    <Dropdown.Toggle
                      className={clsx(
                        'btn bg-transparent border w-100 text-start fs-sm fs-lg-8',
                        errors.status && 'is-invalid',
                        value && 'text-neutral-700',
                        !value && 'text-neutral-500',
                      )}
                      id={getFieldId('status')}
                    >
                      {value || '請選擇商品狀態'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      {STATUS_OPTIONS.map((option, index) => (
                        <Dropdown.Item as="button" type="button" eventKey={option} key={index}>
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              ></Controller>
              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>
          </div>
          {/* 商品描述 */}
          <div>
            <RhfTextareaWithCounter
              fieldName="description"
              labelText="商品描述"
              maxTextLength={PRODUCT_DESCRIPTION_MAX_LENGTH}
              rows={10}
              id={getFieldId('description')}
              placeholder={`請輸入商品描述（限制 ${PRODUCT_DESCRIPTION_MAX_LENGTH} 字以內）`}
              {...register('description')}
            />
          </div>
        </section>
        {/* 內容物設定 */}
        <BundleSection getFieldId={getFieldId} />
        {/* 價格設定 */}
        <section className="py-6 border border-2 p-6 mb-10">
          <h3 className="h4 mb-8 text-primary-700">價格設定</h3>
          <div className="d-flex gap-6">
            {/* 原價 */}
            <div className="mb-3 w-50">
              <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('origin-price')}>
                原價<span className="text-danger">*</span>
              </label>
              <div className={clsx('input-group', errors.originPrice && 'is-invalid')}>
                <span className="input-group-text bg-primary-100">NT$</span>
                <input
                  id={getFieldId('origin-price')}
                  className={clsx('form-control', errors.originPrice && 'is-invalid')}
                  type="text"
                  placeholder="請輸入原價"
                  {...register('originPrice', {
                    onChange: handleOriginPriceChange,
                  })}
                />
              </div>
              {errors.originPrice && <div className="invalid-feedback">{errors.originPrice.message}</div>}
            </div>
            {/* 售價 */}
            <div className="mb-3 w-50">
              <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('price')}>
                售價<span className="text-danger">*</span>
              </label>
              <div className={clsx('input-group', errors.price && 'is-invalid')}>
                <span className="input-group-text bg-primary-100">NT$</span>
                <input
                  id={getFieldId('price')}
                  className={clsx('form-control', errors.price && 'is-invalid')}
                  type="text"
                  placeholder="請輸入售價"
                  {...register('price')}
                />
              </div>
              {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
            </div>
          </div>
          {/* 單位 */}
          <div className="w-50 pe-3">
            <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('unit')}>
              單位<span className="text-danger">*</span>
            </label>
            <Controller
              name="unit"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  className={clsx('checkout-dropdown', errors.unit && 'zod-validated is-invalid')}
                  onSelect={onChange}
                >
                  <Dropdown.Toggle
                    className={clsx(
                      'btn bg-transparent border w-100 text-start fs-sm fs-lg-8',
                      errors.unit && 'is-invalid',
                      value && 'text-neutral-700',
                      !value && 'text-neutral-500',
                    )}
                    id={getFieldId('unit')}
                  >
                    {value || '請選擇商品單位'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {UNIT_OPTIONS.map((option, index) => (
                      <Dropdown.Item as="button" type="button" eventKey={option} key={index}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            ></Controller>
            {errors.unit && <div className="invalid-feedback">{errors.unit.message}</div>}
          </div>
        </section>
        {/* 圖片設定 */}
        <section className="py-6 border border-2 p-6 mb-10">
          <h3 className="h4 mb-8 text-primary-700 d-flex align-items-center">
            圖片設定
            {/* Tooltip */}
            <OverlayTrigger
              placement="right"
              delay={{ show: 50, hide: 200 }}
              popperConfig={{
                strategy: 'fixed',
                modifiers: [
                  { name: 'flip', enabled: true },
                  { name: 'preventOverflow', enabled: true },
                ],
              }}
              overlay={
                <Tooltip id="image-help-tooltip" className="custom-tooltip">
                  僅支援 .jpg, .jpeg, .png 格式，單一檔案上限為 3MB
                </Tooltip>
              }
            >
              <button type="button" className="ms-2 p-1 btn border-0 d-inline-flex h-100">
                <span className="material-symbols-rounded text-neutral-400">help</span>
              </button>
            </OverlayTrigger>
          </h3>
          {/* 主圖設定 */}
          <div className="mb-6">
            <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('main-image-url')}>
              主圖設定<span className="text-danger">*</span>
            </label>
            <p className="text-neutral-400 fs-sm mb-2">
              將顯示於前台商品列表頁中的商品卡片、商品詳細頁中的圖片輪播、後台商品列表中的商品縮圖
            </p>
            {/* 主圖卡片 */}
            <div className="p-1">
              <UploadImageCard
                fileFieldName="mainImageFile"
                urlFieldName="mainImageUrl"
                urlFieldId={getFieldId('main-image-url')}
                fileFieldId={getFieldId('main-image-file')}
              />
            </div>
          </div>
          {/* 介紹圖片設定 */}
          <fieldset className="mb-6">
            <legend className="text-neutral-700 fs-7 m-0 d-inline-block w-auto mb-2">介紹圖片設定</legend>
            <p className="text-neutral-400 fs-sm mb-2">將顯示於前台商品詳細頁中的介紹區塊</p>
            {/* 介紹圖卡片 */}
            <div className="d-flex gap-4 align-items-stretch overflow-x-auto p-1">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="d-flex flex-column gap-2">
                  <label htmlFor={getFieldId(`intro-image-url-${index + 1}`)}>
                    區塊{index === 0 ? '上' : '下'}半部圖片{index === 0 && <span className="text-danger">*</span>}
                  </label>
                  <div className="flex-grow-1">
                    <UploadImageCard
                      className="h-100"
                      fileFieldName={`introImageFile${index + 1}`}
                      urlFieldName={`introImageUrl${index + 1}`}
                      urlFieldId={getFieldId(`intro-image-url-${index + 1}`)}
                      fileFieldId={getFieldId(`intro-image-file-${index + 1}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
          {/* 其它圖片設定 */}
          <fieldset>
            <div className="d-flex align-items-center mb-2">
              <legend className="text-neutral-700 fs-7 m-0 d-inline-block w-auto">其他圖片設定</legend>
              <span className="ms-2 fs-sm bg-primary-100 px-3 py-1 ms-auto">{usedImageCount} / 5 已使用</span>
            </div>
            <p className="text-neutral-400 fs-sm mb-2">將顯示於前台商品詳細頁中的圖片輪播</p>
            {/* 副圖卡片 */}
            <div className="d-flex gap-4 overflow-x-auto p-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <UploadImageCard
                  fileFieldName={`imageFile${index + 1}`}
                  urlFieldName={`imageUrl${index + 1}`}
                  urlFieldId={getFieldId(`image-url-${index + 1}`)}
                  fileFieldId={getFieldId(`image-file-${index + 1}`)}
                  key={index}
                />
              ))}
            </div>
          </fieldset>
        </section>
        {/* 表單操作 */}
        <div className="d-flex">
          {/* 放棄填寫 */}
          <Button
            as={Link}
            to="/admin/products"
            variant="outline-neutral"
            shape="pill"
            size="sm"
            className="ms-auto me-4"
          >
            放棄填寫
          </Button>
          {/* 提交表單 */}
          <Button type="submit" variant="filled-primary" shape="pill" size="sm" disabled={!isDirty}>
            {isEditMode ? '儲存變更' : '新增商品'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default memo(ProductForm);
