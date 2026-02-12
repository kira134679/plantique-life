import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useState } from 'react';
import { Dropdown, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

import { CATEGORY_OPTIONS, IMAGE_UPLOAD_REMIND_MESSAGE, STATUS_OPTIONS, UNIT_OPTIONS } from '../constants';
import { formatToPayload } from '../helpers';
import productSchema from '../productSchema';

import Button from '@/components/Button';
import UploadImageCard from './UploadImageCard';

function ProductForm({ isEditMode, onSubmit, initialData = {}, productId = '' }) {
  // --- Logic Helpers ---
  // 依照新增模式/編輯模式產生不同的欄位 id 前綴
  const fieldIdPrefix = isEditMode ? 'update-product' : 'new-product';
  const getFieldId = name => {
    return `${fieldIdPrefix}-${name}`;
  };

  // --- React Hook Form ---
  const methods = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    shouldFocusError: false,
    // 所有欄位都需要有預設值，否則 reset 時會變成 undefined 而非字串型別，無法通過 zod 驗證
    defaultValues: {
      title: '',
      category: '',
      status: '',
      mainImageUrl: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      imageUrl4: '',
      imageUrl5: '',
      mainImageFile: null,
      imageFile1: null,
      imageFile2: null,
      imageFile3: null,
      imageFile4: null,
      imageFile5: null,
      originPrice: '',
      price: '',
      unit: '',
      content: '',
      description: '',
      ...initialData, // 更新商品時，用初始值已經有的屬性去覆蓋掉空的預設值
    },
  });
  const {
    control,
    register,
    handleSubmit,
    setFocus,
    getValues,
    setError,
    formState: { errors, isDirty },
  } = methods;

  // 即時監測 url 欄位是否有值，計算出目前有多少圖片欄位已使用（不含未上傳至後端的圖片）
  // 若圖片檔案已上傳後端，後端回傳的圖片網址會存入 url 欄位
  const imageUrls = useWatch({ control, name: ['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4', 'imageUrl5'] });
  const usedImageCount = useMemo(() => imageUrls.filter(Boolean).length, [imageUrls]);

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
    // 檢查副圖
    const isOthersPassed = Array.from({ length: 5 })
      .map((_, index) => checkImageStatus(`imageUrl${index + 1}`, `imageFile${index + 1}`))
      .every(value => value === true);

    if (isMainPassed && isOthersPassed) {
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

  // --- Side Effects ---
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 基本設定 */}
      <section className="py-6">
        <h3 className="h4 mb-6">基本設定</h3>
        {/* 商品 ID */}
        {isEditMode ? (
          <div className="mb-4 w-50 min-w-14rem">
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
        {/* 商品名稱 */}
        <div className="mb-4 w-25 min-w-14rem">
          <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('title')}>
            商品名稱<span className="text-danger">*</span>
          </label>
          <input
            id={getFieldId('title')}
            className={clsx('form-control', errors.title && 'is-invalid')}
            type="text"
            placeholder="請輸入商品名稱"
            {...register('title')}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>
        {/* 商品類別 */}
        <div className="mb-4 w-25 min-w-14rem">
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
                    'btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8',
                    errors.category && 'is-invalid',
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
        <div className="mb-4 w-25 min-w-14rem">
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
                    'btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8',
                    errors.status && 'is-invalid',
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
      </section>
      {/* 圖片設定 */}
      <section className="py-6">
        <h3 className="h4 mb-6 d-flex align-items-center">
          圖片設定
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
        <div className="mb-4">
          <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('main-image-url')}>
            主圖設定<span className="text-danger">*</span>
          </label>
          {/* 主圖卡片 */}
          <FormProvider {...methods}>
            <div className="p-1">
              <UploadImageCard
                fileFieldName="mainImageFile"
                urlFieldName="mainImageUrl"
                urlFieldId={getFieldId('main-image-url')}
                fileFieldId={getFieldId('main-image-file')}
              />
            </div>
          </FormProvider>
        </div>
        {/* 其它圖片設定 */}
        <fieldset className="mb-4">
          <div className="d-flex align-items-center mb-2">
            <legend className="text-neutral-700 fs-7 m-0 d-inline-block w-auto">其他圖片設定</legend>
            <span className="ms-2 fs-sm bg-primary-100 px-3 py-1 ms-auto">{usedImageCount} / 5 已使用</span>
          </div>
          {/* 副圖卡片 */}
          <div className="d-flex gap-4 overflow-x-auto p-1">
            <FormProvider {...methods}>
              {Array.from({ length: 5 }).map((_, index) => (
                <UploadImageCard
                  fileFieldName={`imageFile${index + 1}`}
                  urlFieldName={`imageUrl${index + 1}`}
                  urlFieldId={getFieldId(`image-url-${index + 1}`)}
                  fileFieldId={getFieldId(`image-file-${index + 1}`)}
                  key={index}
                />
              ))}
            </FormProvider>
          </div>
        </fieldset>
      </section>
      {/* 價格設定 */}
      <section className="py-6">
        <h3 className="h4 mb-6">價格設定</h3>
        {/* 原價 */}
        <div className="mb-4 w-25 min-w-14rem">
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
              {...register('originPrice')}
            />
          </div>
          {errors.originPrice && <div className="invalid-feedback">{errors.originPrice.message}</div>}
        </div>
        {/* 售價 */}
        <div className="mb-4 w-25 min-w-14rem">
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
        {/* 單位 */}
        <div className="mb-4 w-25 min-w-14rem">
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
                    'btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8',
                    errors.unit && 'is-invalid',
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
      {/* 內容設定 */}
      <section className="py-6">
        <h3 className="h4 mb-6">內容設定</h3>
        {/* 商品內容 */}
        <div className="mb-4">
          <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('content')}>
            商品內容
          </label>
          <textarea
            id={getFieldId('content')}
            className="form-control min-h-20rem min-w-14rem"
            {...register('content')}
          />
        </div>
        {/* 商品描述 */}
        <div className="mb-4">
          <label className="form-label text-neutral-700 fs-7" htmlFor={getFieldId('description')}>
            商品描述
          </label>
          <textarea
            id={getFieldId('description')}
            className="form-control min-h-20rem min-w-14rem"
            {...register('description')}
          />
        </div>
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
  );
}

export default memo(ProductForm);
