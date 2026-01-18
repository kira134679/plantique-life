import { guestOrderApi } from '@/api';
import Button from '@/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import IMask from 'imask';
import { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';
import { useSelector } from 'react-redux';
import { z } from 'zod';

// 運費
const deliveryFee = 120;
// 下拉選項
const deliveryOptions = ['黑貓宅配'];
const paymentOptions = ['貨到付款', '信用卡一次付清', '轉帳'];
const invoiceOptions = ['電子發票', '雲端載具', '統一編號'];
// 表單驗證規則
const baseSchema = {
  // 運送方式
  delivery: z.enum(deliveryOptions, {
    error: issue => (issue.code === 'invalid_enum_value' ? '不支援此運送方式，請重新選擇' : '未選擇運送方式'),
  }),
  // 付款方式
  payment: z.enum(paymentOptions, {
    error: issue => (issue.code === 'invalid_enum_value' ? '不支援此付款方式，請重新選擇' : '未選擇付款方式'),
  }),
  // 訂購人資訊
  purchaserName: z.string().min(1, '未輸入訂購人姓名').max(20, '訂購人姓名最長為 20'),
  purchaserPhone: z
    .string()
    .min(1, '未輸入訂購人電話')
    .regex(/^09\d{2}(?:-\d{3}){2}$/, '訂購人電話輸入錯誤'),
  purchaserEmail: z
    .string()
    .min(1, '未輸入訂購人電子郵件')
    .refine(val => z.email().safeParse(val).success, '訂購人電子郵件輸入錯誤'),
  // 收件人地址
  recipientAddress: z.string().min(1, '未輸入收件人地址'),
  // 發票類型
  invoice: z.enum(invoiceOptions, {
    error: issue => (issue.code === 'invalid_enum_value' ? '不支援此發票類型，請重新選擇' : '未選擇發票類型'),
  }),
  // 以下欄位預設不需要嚴格驗證，但需要包含在表單資料中
  // 注意：recipientName, recipientPhone, recipientEmail 在未勾選「同訂購人資訊」時，
  //      會被 recipientSchema 覆蓋為更嚴格的驗證規則
  recipientChecked: z.boolean(),
  recipientName: z.string(),
  recipientPhone: z.string(),
  recipientEmail: z.string(),
  message: z.string(),
};
// 收件人資訊 (姓名、電話、Email)，依照「同訂購人資訊」勾選狀態決定是否驗證
const recipientSchema = {
  recipientName: z.string().min(1, '未輸入收件人姓名').max(20, '收件人姓名長度為 20'),
  recipientPhone: z
    .string()
    .min(1, '未輸入收件人電話')
    .regex(/^09\d{2}(?:-\d{3}){2}$/, '收件人電話輸入錯誤'),
  recipientEmail: z
    .string()
    .min(1, '未輸入收件人電子郵件')
    .refine(val => z.email().safeParse(val).success, '收件人電子郵件輸入錯誤'),
};
// 信用卡資訊
const creditCardSchema = {
  cardNumber: z
    .string()
    .regex(/^\d{4}(?:-\d{4}){3}$/, '卡號輸入錯誤')
    .min(1, '未輸入信用卡號'),
  cardExp: z
    .string()
    .regex(/\d{2}\/\d{2}/, '有效期限輸入錯誤')
    .min(1, '未輸入有效期限'),
  cardCvc: z.string().regex(/\d{3}/, '末三碼輸入錯誤').min(1, '未輸入末三碼'),
};
// 手機條碼
const mobileBarcodeSchema = {
  mobileBarcode: z
    .string()
    .length(8, '手機條碼輸入錯誤')
    .regex(/^\/[0-9A-Z.\-+]{7}$/, '手機條碼輸入錯誤')
    .min(1, '未輸入手機條碼'),
};
// 統一編號
const ubnSchema = {
  ubn: z.string().regex(/\d{8}/, '統一編號輸入錯誤').min(1, '未輸入統一編號'),
};

function SecondStep({ handleSwitchStep, setOrderInfo }) {
  // 用於追蹤 Modal 關閉後是否要換頁
  const shouldSwitchAfterClose = useRef(false);
  // 控制 Modal 顯示與否
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 控制 cvc 欄位內容隱藏與否
  const [isCvcVisible, setIsCvcVisible] = useState(false);

  // Dropdown refs (用於自訂 focus 順序)
  const deliveryToggleRef = useRef(null);
  const paymentToggleRef = useRef(null);
  const invoiceToggleRef = useRef(null);

  // 從 Redux 取得購物車資料
  const { carts, total, finalTotal } = useSelector(state => state.cart);

  // 開關 Modal
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowConfirmModal = () => setShowConfirmModal(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    setFocus,
    clearErrors,
    reset,
    resetField,
    getValues,
  } = useForm({
    resolver: (values, context, options) => {
      let schema = z.object(baseSchema);

      // 未勾選「同訂購人資訊」時，需要驗證收件人欄位
      if (!values.recipientChecked) {
        schema = schema.extend(recipientSchema);
      }
      // 選擇信用卡付款時，需要驗證信用卡欄位
      if (values.payment === '信用卡一次付清') {
        schema = schema.extend(creditCardSchema);
      }
      // 選擇不同發票類型時，需要驗證對應欄位
      if (values.invoice === '雲端載具') {
        schema = schema.extend(mobileBarcodeSchema);
      } else if (values.invoice === '統一編號') {
        schema = schema.extend(ubnSchema);
      }

      return zodResolver(schema)(values, context, options);
    },
    mode: 'onChange', // 即時驗證
    shouldFocusError: false, // 關閉 RHF 自動 focus，改用自訂 onError
    defaultValues: {
      delivery: '',
      payment: '',
      cardNumber: '',
      cardExp: '',
      cardCvc: '',
      purchaserName: '',
      purchaserPhone: '',
      purchaserEmail: '',
      recipientChecked: false,
      recipientName: '',
      recipientPhone: '',
      recipientEmail: '',
      recipientAddress: '',
      invoice: '',
      mobileBarcode: '',
      ubn: '',
      message: '',
    },
  });

  // 監聽付款方式和發票類型，用來顯示 / 隱藏相關欄位
  const deliveryMethod = useWatch({ control, name: 'delivery' });
  const paymentMethod = useWatch({ control, name: 'payment' });
  const invoiceType = useWatch({ control, name: 'invoice' });
  const recipientChecked = useWatch({ control, name: 'recipientChecked' });

  // 監聽訂購人資訊，用於同步到收件人
  const purchaserName = useWatch({ control, name: 'purchaserName' });
  const purchaserPhone = useWatch({ control, name: 'purchaserPhone' });
  const purchaserEmail = useWatch({ control, name: 'purchaserEmail' });
  // 監聽收件人資訊，用於 Modal 顯示
  const recipientName = useWatch({ control, name: 'recipientName' });
  const recipientPhone = useWatch({ control, name: 'recipientPhone' });
  const recipientEmail = useWatch({ control, name: 'recipientEmail' });
  const recipientAddress = useWatch({ control, name: 'recipientAddress' });

  // 當勾選「同訂購人資訊」時，持續同步訂購人資訊到收件人
  useEffect(() => {
    if (recipientChecked) {
      setValue('recipientName', purchaserName);
      setValue('recipientPhone', purchaserPhone);
      setValue('recipientEmail', purchaserEmail);
      clearErrors('recipientName');
      clearErrors('recipientPhone');
      clearErrors('recipientEmail');
    }
  }, [recipientChecked, purchaserName, purchaserPhone, purchaserEmail, setValue, clearErrors]);

  // 當選擇信用卡付款時，自動 focus 到卡號欄位
  useEffect(() => {
    if (paymentMethod === '信用卡一次付清') {
      setFocus('cardNumber');
    }
  }, [paymentMethod, setFocus]);

  // 當選擇發票類型時，自動 focus 到對應欄位
  useEffect(() => {
    if (invoiceType === '雲端載具') {
      setFocus('mobileBarcode');
    } else if (invoiceType === '統一編號') {
      setFocus('ubn');
    }
  }, [invoiceType, setFocus]);

  // 驗證成功
  const onSubmit = () => {
    handleShowConfirmModal();
  };

  // 驗證失敗時，依照畫面順序 focus 到第一個錯誤欄位
  const onError = errors => {
    // 定義 focus 順序（依照畫面順序）
    const focusOrder = [
      { name: 'delivery', ref: deliveryToggleRef },
      { name: 'payment', ref: paymentToggleRef },
      { name: 'cardNumber', focusName: 'cardNumber' },
      { name: 'cardExp', focusName: 'cardExp' },
      { name: 'cardCvc', focusName: 'cardCvc' },
      { name: 'purchaserName', focusName: 'purchaserName' },
      { name: 'purchaserPhone', focusName: 'purchaserPhone' },
      { name: 'purchaserEmail', focusName: 'purchaserEmail' },
      { name: 'recipientName', focusName: 'recipientName' },
      { name: 'recipientPhone', focusName: 'recipientPhone' },
      { name: 'recipientEmail', focusName: 'recipientEmail' },
      { name: 'recipientAddress', focusName: 'recipientAddress' },
      { name: 'invoice', ref: invoiceToggleRef },
      { name: 'mobileBarcode', focusName: 'mobileBarcode' },
      { name: 'ubn', focusName: 'ubn' },
    ];

    for (const field of focusOrder) {
      if (errors[field.name]) {
        if (field.ref) {
          field.ref.current?.focus();
        } else if (field.focusName) {
          setFocus(field.focusName);
        }
        break; // 只 focus 第一個錯誤
      }
    }
  };

  // Modal 完全關閉後，依 flag 決定是否換頁
  const handleModalExited = () => {
    if (shouldSwitchAfterClose.current) {
      shouldSwitchAfterClose.current = false;
      handleSwitchStep(2);
    }
  };

  // 確認送出：設定 flag，關閉 Modal 後會觸發換頁
  const handleConfirmSubmit = async () => {
    // 建立訂單
    try {
      const orderData = getValues();
      const apiData = {
        user: {
          name: orderData.recipientName,
          email: orderData.recipientEmail,
          tel: orderData.recipientPhone,
          address: orderData.recipientAddress,
          delivery: orderData.delivery,
          payment: orderData.payment,
          cardNumber: orderData.cardNumber,
          cardExp: orderData.cardExp,
          cardCvc: orderData.cardCvc,
          purchaserName: orderData.purchaserName,
          purchaserPhone: orderData.purchaserPhone,
          purchaserEmail: orderData.purchaserEmail,
          invoice: orderData.invoice,
          mobileBarcode: orderData.mobileBarcode,
          ubn: orderData.ubn,
        },
        message: orderData.message,
      };
      const res = await guestOrderApi.createOrder(apiData);
      setOrderInfo({
        orderId: res.orderId,
        email: recipientEmail,
        // 是否轉帳付款
        isTransfer: paymentMethod === '轉帳',
        // 轉帳繳費截止時間 (建立訂單時間後 3 天的 23:59:59) (timestamp)
        transferDeadline: new Date(res.create_at * 1000 + 3 * 24 * 60 * 60 * 1000).setHours(23, 59, 59, 999),
      });

      // 設定 flag，關閉 Modal 後會觸發換頁
      shouldSwitchAfterClose.current = true;
      handleCloseConfirmModal();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleBackToCart = async () => {
    await handleSwitchStep(0, false);
    // 重設信用卡欄位（基於隱私考量，清除敏感資訊）
    // keepError/keepDirty/keepTouched: false 只能清除「之前已存在」的狀態
    const resetOptions = { keepError: false, keepDirty: false, keepTouched: false };
    resetField('cardNumber', resetOptions);
    resetField('cardExp', resetOptions);
    resetField('cardCvc', resetOptions);
    // 由於 mode: 'onChange'，resetField 改變值會觸發異步的 zodResolver 驗證
    // 異步驗證完成後會產生「新的」錯誤，這些錯誤不受 resetOptions 控制
    // 因此需要用 setTimeout 確保在異步驗證完成後，再用 reset() 清除所有狀態
    const currentValues = getValues();
    setTimeout(() => reset(currentValues, { keepValues: true }), 0);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="row flex-column-reverse flex-lg-row">
          <div className="col-lg-8">
            <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10">
              <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                選擇運送及付款方式 <span className="text-danger">*</span>
              </h6>
              {/* 運送方式 */}
              <p className="fs-lg-7 text-neutral-700 mb-2">運送方式</p>
              <Controller
                name="delivery"
                control={control}
                render={({ field }) => (
                  <>
                    <Dropdown
                      className={clsx(
                        'checkout-dropdown',
                        (errors.delivery || (!errors.delivery && dirtyFields.delivery)) && 'zod-validated',
                      )}
                      onSelect={field.onChange}
                    >
                      <Dropdown.Toggle
                        ref={deliveryToggleRef}
                        variant=""
                        className={clsx(
                          'border w-100 text-start text-neutral-500 fs-sm fs-lg-8',
                          errors.delivery && 'is-invalid',
                          !errors.delivery && dirtyFields.delivery && 'is-valid',
                        )}
                      >
                        {(field.value && <span className="text-neutral-700">{field.value}</span>) || '請選擇運送方式'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {deliveryOptions.map(option => (
                          <Dropdown.Item key={option} eventKey={option} className="fs-sm fs-lg-8">
                            {option}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <div className="fs-sm text-danger mt-1">{errors.delivery?.message}</div>
                  </>
                )}
              />
              <p className="fs-sm text-neutral-400 mt-1">* 宅配貨到付款會產生額外手續費</p>
              <p className="fs-sm text-neutral-400 mb-3">* 宅配週日不配送</p>
              {/* 付款方式 */}
              <p className="fs-lg-7 text-neutral-700 mb-2">付款方式</p>
              <Controller
                name="payment"
                control={control}
                render={({ field }) => (
                  <>
                    <Dropdown
                      className={clsx(
                        'checkout-dropdown',
                        (errors.payment || (!errors.payment && dirtyFields.payment)) && 'zod-validated',
                      )}
                      onSelect={field.onChange}
                    >
                      <Dropdown.Toggle
                        ref={paymentToggleRef}
                        variant=""
                        className={clsx(
                          'border w-100 text-start text-neutral-500 fs-sm fs-lg-8',
                          errors.payment && 'is-invalid',
                          !errors.payment && dirtyFields.payment && 'is-valid',
                        )}
                      >
                        {(field.value && <span className="text-neutral-700">{field.value}</span>) || '請選擇付款方式'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {paymentOptions.map(option => (
                          <Dropdown.Item key={option} eventKey={option} className="fs-sm fs-lg-8">
                            {option}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <div className="fs-sm text-danger mt-1">{errors.payment?.message}</div>
                  </>
                )}
              />
              {/* 條件顯示：信用卡欄位 */}
              {paymentMethod === '信用卡一次付清' && (
                <div className="mt-4">
                  <div className="mb-2">
                    <label htmlFor="card-number" className="form-label fs-lg-7 text-neutral-700">
                      信用卡卡號
                    </label>
                    <div>
                      <Controller
                        name="cardNumber"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                          <IMaskInput
                            id="card-number"
                            inputRef={ref}
                            value={value}
                            className={clsx(
                              'form-control cart-card-number fs-sm fs-lg-8',
                              errors.cardNumber && 'is-invalid',
                              !errors.cardNumber && dirtyFields.cardNumber && 'is-valid',
                            )}
                            // IMask 的 onAccept 會回傳 value 和 mask 實例
                            onAccept={value => onChange(value)}
                            // 當 Mask 填滿時觸發
                            onComplete={() => {
                              // 讓下一個欄位 (Expiry Date) 取得焦點
                              setFocus('cardExp');
                            }}
                            // IMask 的設定
                            mask="0000-0000-0000-0000"
                            placeholder="****-****-****-****"
                            overwrite={true} // 是否覆蓋模式
                          />
                        )}
                      />
                      <div className="fs-sm text-danger mt-1">{errors.cardNumber?.message}</div>
                    </div>
                  </div>
                  <div className="d-flex gap-4 gap-lg-6">
                    <div>
                      <label htmlFor="card-exp" className="form-label fs-lg-7 text-neutral-700">
                        卡片有效期限
                      </label>
                      <div>
                        <Controller
                          name="cardExp"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <IMaskInput
                              id="card-exp"
                              inputRef={ref}
                              value={value}
                              className={clsx(
                                'form-control cart-card-exp fs-sm fs-lg-8',
                                errors.cardExp && 'is-invalid',
                                !errors.cardExp && dirtyFields.cardExp && 'is-valid',
                              )}
                              onAccept={value => onChange(value)}
                              // 填滿後跳去 CVC
                              onComplete={() => {
                                setFocus('cardCvc');
                              }}
                              mask="MM/YY"
                              blocks={{
                                MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
                                YY: { mask: IMask.MaskedRange, from: 25, to: 99 },
                              }}
                              placeholder="MM/YY"
                              overwrite={true}
                            />
                          )}
                        />
                        <div className="fs-sm text-danger mt-1">{errors.cardExp?.message}</div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="card-cvc" className="form-label fs-lg-7 text-neutral-700">
                        背面末三碼
                      </label>
                      <div className="position-relative">
                        <Controller
                          name="cardCvc"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <IMaskInput
                              id="card-cvc"
                              inputRef={ref}
                              value={value}
                              type={isCvcVisible ? 'text' : 'password'}
                              className={clsx(
                                'form-control cart-card-cvc fs-sm fs-lg-8',
                                errors.cardCvc && 'is-invalid',
                                !errors.cardCvc && dirtyFields.cardCvc && 'is-valid',
                                !errors.cardCvc && !dirtyFields.cardCvc && 'unvalidated',
                              )}
                              onAccept={value => onChange(value)}
                              mask="000"
                              placeholder="CVC"
                              overwrite={true}
                            />
                          )}
                        />
                        <Button
                          type="button"
                          className={clsx(
                            'cart-custom-icon-btn',
                            !errors.cardCvc && !dirtyFields.cardCvc && 'unvalidated',
                          )}
                          onClick={() => setIsCvcVisible(!isCvcVisible)}
                        >
                          <span className="d-block material-symbols-rounded">
                            {isCvcVisible ? 'visibility_off' : 'visibility'}
                          </span>
                        </Button>
                      </div>
                      <div className="fs-sm text-danger mt-1">{errors.cardCvc?.message}</div>
                    </div>
                  </div>
                </div>
              )}
            </section>
            {/* 訂購人資料 */}
            <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10">
              <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                訂購人資料 <span className="text-danger">*</span>
              </h6>
              <div className="d-flex gap-4 gap-lg-6 mb-3">
                <div className="flex-grow-1">
                  <label htmlFor="purchaser-name" className="form-label fs-lg-7 text-neutral-700">
                    訂購人姓名
                  </label>
                  <input
                    {...register('purchaserName')}
                    type="text"
                    className={clsx(
                      'form-control fs-sm fs-lg-8',
                      errors.purchaserName && 'is-invalid',
                      !errors.purchaserName && dirtyFields.purchaserName && 'is-valid',
                    )}
                    id="purchaser-name"
                    placeholder="ex: 王X明"
                  />
                  <div className="fs-sm text-danger mt-1">{errors.purchaserName?.message}</div>
                </div>
                <div className="flex-grow-1">
                  <label htmlFor="purchaser-phone" className="form-label fs-lg-7 text-neutral-700">
                    訂購人電話
                  </label>
                  <Controller
                    name="purchaserPhone"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <IMaskInput
                        id="purchaser-phone"
                        inputRef={ref}
                        value={value}
                        className={clsx(
                          'form-control fs-sm fs-lg-8',
                          errors.purchaserPhone && 'is-invalid',
                          !errors.purchaserPhone && dirtyFields.purchaserPhone && 'is-valid',
                        )}
                        onAccept={value => onChange(value)}
                        mask="0000-000-000"
                        placeholder="ex: 0912-123-123"
                        overwrite={true}
                      />
                    )}
                  />
                  <div className="fs-sm text-danger mt-1">{errors.purchaserPhone?.message}</div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="purchaser-email" className="form-label fs-lg-7 text-neutral-700">
                  訂購人電子郵件
                </label>
                <input
                  {...register('purchaserEmail')}
                  type="email"
                  className={clsx(
                    'form-control fs-sm fs-lg-8',
                    errors.purchaserEmail && 'is-invalid',
                    !errors.purchaserEmail && dirtyFields.purchaserEmail && 'is-valid',
                  )}
                  id="purchaser-email"
                  placeholder="ex: plantique@gmail.com"
                />
                <div className="fs-sm text-danger mt-1">{errors.purchaserEmail?.message}</div>
              </div>
            </section>
            {/* 收件人資料 */}
            <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10">
              <div className="d-flex">
                <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                  收件人資料 <span className="text-danger">*</span>
                </h6>
                <div className="form-check ms-auto">
                  <input
                    {...register('recipientChecked')}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="recipient-checked"
                  />
                  <label className="form-check-label" htmlFor="recipient-checked">
                    同訂購人資訊
                  </label>
                </div>
              </div>
              <div>
                <div className="d-flex gap-4 gap-lg-6 mb-3">
                  <div className="flex-grow-1">
                    <label htmlFor="recipient-name" className="form-label fs-lg-7 text-neutral-700">
                      收件人姓名
                    </label>
                    <input
                      {...register('recipientName')}
                      type="text"
                      className={clsx(
                        'form-control fs-sm fs-lg-8',
                        errors.recipientName && 'is-invalid',
                        !errors.recipientName && dirtyFields.recipientName && 'is-valid',
                      )}
                      disabled={recipientChecked}
                      id="recipient-name"
                      placeholder="ex: 王X明"
                    />
                    <div className="fs-sm text-danger mt-1">{errors.recipientName?.message}</div>
                  </div>
                  <div className="flex-grow-1">
                    <label htmlFor="recipient-phone" className="form-label fs-lg-7 text-neutral-700">
                      收件人電話
                    </label>
                    <Controller
                      name="recipientPhone"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <IMaskInput
                          id="recipient-phone"
                          inputRef={ref}
                          value={value}
                          className={clsx(
                            'form-control fs-sm fs-lg-8',
                            errors.recipientPhone && 'is-invalid',
                            !errors.recipientPhone && dirtyFields.recipientPhone && 'is-valid',
                          )}
                          disabled={recipientChecked}
                          onAccept={value => onChange(value)}
                          mask="0000-000-000"
                          placeholder="ex: 0912-123-123"
                          overwrite={true}
                        />
                      )}
                    />
                    <div className="fs-sm text-danger mt-1">{errors.recipientPhone?.message}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-email" className="form-label fs-lg-7 text-neutral-700">
                    收件人電子郵件
                  </label>
                  <input
                    {...register('recipientEmail')}
                    type="email"
                    className={clsx(
                      'form-control fs-sm fs-lg-8',
                      errors.recipientEmail && 'is-invalid',
                      !errors.recipientEmail && dirtyFields.recipientEmail && 'is-valid',
                    )}
                    disabled={recipientChecked}
                    id="recipient-email"
                    placeholder="ex: plantique@gmail.com"
                  />
                  <div className="fs-sm text-danger mt-1">{errors.recipientEmail?.message}</div>
                </div>
                <div className="flex-grow-1 mb-3">
                  <label htmlFor="recipient-address" className="form-label fs-lg-7 text-neutral-700">
                    收件人地址
                  </label>
                  <input
                    {...register('recipientAddress')}
                    type="text"
                    className={clsx(
                      'form-control fs-sm fs-lg-8',
                      errors.recipientAddress && 'is-invalid',
                      !errors.recipientAddress && dirtyFields.recipientAddress && 'is-valid',
                    )}
                    id="recipient-address"
                    placeholder="請填寫收件地址"
                  />
                  <div className="fs-sm text-danger mt-1">{errors.recipientAddress?.message}</div>
                </div>
              </div>
            </section>
            {/* 發票類型 */}
            <section className="border border-2 p-4 p-lg-6 mb-6 mb-lg-10">
              <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">
                發票類型 <span className="text-danger">*</span>
              </h6>
              <div>
                <p className="fs-lg-7 text-neutral-700 mb-2">選擇發票類型</p>
                <Controller
                  name="invoice"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Dropdown
                        className={clsx(
                          'checkout-dropdown',
                          (errors.invoice || (!errors.invoice && dirtyFields.invoice)) && 'zod-validated',
                        )}
                        onSelect={field.onChange}
                        onToggle={isOpen => {
                          if (!isOpen) {
                            field.onBlur(); // 手動觸發 onBlur，讓 RHF 知道欄位被摸過了
                          }
                        }}
                      >
                        <Dropdown.Toggle
                          ref={invoiceToggleRef}
                          variant=""
                          className={clsx(
                            'border w-100 text-start text-neutral-500 fs-sm fs-lg-8',
                            errors.invoice && 'is-invalid',
                            !errors.invoice && dirtyFields.invoice && 'is-valid',
                          )}
                        >
                          {(field.value && <span className="text-neutral-700">{field.value}</span>) || '請選擇發票類型'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          {invoiceOptions.map(option => (
                            <Dropdown.Item key={option} eventKey={option} className="fs-sm fs-lg-8">
                              {option}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <div className="fs-sm text-danger mt-1">{errors.invoice?.message}</div>
                    </>
                  )}
                />
                {/* 條件顯示：載具欄位 */}
                {invoiceType === '雲端載具' && (
                  <div className="mt-3">
                    <label htmlFor="mobile-barcode" className="form-label fs-lg-7">
                      手機條碼
                    </label>
                    <input
                      {...register('mobileBarcode')}
                      type="text"
                      className={clsx(
                        'form-control fs-sm fs-lg-8',
                        errors.mobileBarcode && 'is-invalid',
                        !errors.mobileBarcode && dirtyFields.mobileBarcode && 'is-valid',
                      )}
                      id="mobile-barcode"
                      placeholder="請輸入手機條碼"
                    />
                    <div className="fs-sm text-danger mt-1">{errors.mobileBarcode?.message}</div>
                  </div>
                )}
                {/* 條件顯示：統一編號欄位 */}
                {invoiceType === '統一編號' && (
                  <div className="mt-3">
                    <label htmlFor="ubn" className="form-label fs-lg-7">
                      統一編號
                    </label>
                    <Controller
                      name="ubn"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <IMaskInput
                          id="ubn"
                          inputRef={ref}
                          value={value}
                          className={clsx(
                            'form-control fs-sm fs-lg-8',
                            errors.ubn && 'is-invalid',
                            !errors.ubn && dirtyFields.ubn && 'is-valid',
                          )}
                          onAccept={value => onChange(value)}
                          mask="00000000"
                          placeholder="請輸入統一編號"
                        />
                      )}
                    />
                    <div className="fs-sm text-danger mt-1">{errors.ubn?.message}</div>
                  </div>
                )}
              </div>
            </section>
            <section className="border border-2 p-4 p-lg-6">
              <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">給店家留言</h6>
              <div className="mb-2">
                <label htmlFor="checkout-notes-text" className="form-label visually-hidden">
                  備註
                </label>
                <textarea
                  {...register('message')}
                  className="form-control fs-sm fs-lg-8"
                  id="checkout-notes-text"
                  rows="3"
                  placeholder="請輸入留言"
                ></textarea>
              </div>
            </section>
          </div>
          {/* 訂單明細 */}
          <div className="col-lg-4 mb-6 mb-lg-0">
            <section className="border border-2 p-4 p-lg-6">
              <h6 className="h6 fs-lg-5 text-primary-700 mb-4 mb-lg-8">訂單明細</h6>
              <ul className="cart-list checkout-list list-unstyled pb-4 pb-lg-8 border-bottom mb-4 mb-lg-8">
                {carts.map(cartItem => (
                  <li key={cartItem.id}>
                    <div className="row gx-3">
                      <div className="col-4">
                        <img
                          className="cart-product-img w-100 object-fit-cover"
                          src={cartItem.product.imageUrl}
                          alt={cartItem.product.title}
                        />
                      </div>
                      <div className="col-8 my-auto">
                        <div className="d-flex gap-2">
                          <div className="col-6 mb-1 mb-lg-0">
                            <h4 className="fs-7 fs-lg-6 text-neutral-700 noto-serif-tc text-nowrap mb-2">
                              {cartItem.product.title}
                            </h4>
                            <p className="fs-sm text-neutral-400">
                              商品數量 : <span className="text-neutral-500">{cartItem.qty}</span>
                            </p>
                          </div>
                          <div className="d-flex justify-content-between col-6 mb-md-0">
                            <p className="fs-8 fw-bold lh-sm fs-lg-7 noto-serif-tc text-primary-700">{`NT$${cartItem.product.price.toLocaleString()}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mb-3 mb-lg-4">
                <span className="fs-sm fs-lg-8 text-neutral-400">商品小計</span>
                <span className="fs-sm fs-lg-8 text-neutral-500">{`NT$${total.toLocaleString()}`}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 mb-lg-4">
                <span className="fs-sm fs-lg-8 text-neutral-400">運費</span>
                <span className="fs-sm fs-lg-8 text-secondary">
                  {deliveryMethod === '黑貓宅配' ? (
                    <>
                      NT$0 <del className="text-neutral-400">{`$${deliveryFee}`}</del>
                    </>
                  ) : (
                    'NT$0'
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3 mb-lg-4">
                <span className="fs-sm fs-lg-8 text-neutral-400">折扣優惠</span>
                <span className="fs-sm fs-lg-8 text-secondary">{`NT$${(total - finalTotal).toLocaleString()}`}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 mb-lg-8">
                <span className="fs-lg-7 text-neutral-700">總金額</span>
                <span className="fs-7 fs-lg-6 fw-bold lh-sm noto-serif-tc text-neutral-700">{`NT$${finalTotal.toLocaleString()}`}</span>
              </div>
              {/* 電腦版按鈕 */}
              <div className="d-none d-lg-flex gap-lg-4 flex-lg-wrap">
                <Button
                  type="button"
                  variant="outline-neutral"
                  shape="pill"
                  size="lg"
                  className="text-nowrap flex-lg-grow-1 checkout-btn-basis px-lg-5"
                  onClick={handleBackToCart}
                >
                  返回購物車
                </Button>
                <Button
                  type="submit"
                  variant="filled-primary"
                  shape="pill"
                  size="lg"
                  className="text-nowrap flex-lg-grow-1 checkout-btn-basis"
                >
                  確認送出
                </Button>
              </div>
            </section>
          </div>
        </div>
        {/* 手機版按鈕 */}
        <div className="d-lg-none my-6">
          <Button type="submit" variant="filled-primary" shape="pill" size="lg" className="w-100 text-nowrap">
            確認送出
          </Button>
          <Button
            type="button"
            variant="outline-neutral"
            shape="pill"
            size="lg"
            className="w-100 text-nowrap mt-4"
            onClick={handleBackToCart}
          >
            返回購物車
          </Button>
        </div>
      </form>
      {/* 提醒通知 Modal */}
      <Modal
        show={showConfirmModal}
        onHide={handleCloseConfirmModal}
        onExited={handleModalExited}
        className="confirm-modal"
        aria-labelledby="confirmModalLabel"
        centered
      >
        <Modal.Header className="justify-content-center border-bottom-0 px-0 pt-8 pt-lg-12 pb-0">
          <Modal.Title className="h4 fs-lg-3 text-primary-700" id="confirmModalLabel">
            貼心提醒
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center px-0 pt-4 pb-6 py-lg-8">
          <p className="fs-6 noto-serif-tc text-neutral-700 mb-1">訂單送出後，將無法修改！</p>
          <p className="fs-6 noto-serif-tc text-neutral-700 mb-3">請再次確認您的收件資訊</p>
          <p className="fs-8 text-neutral-400 mb-1">收件資訊</p>
          <div className="d-flex justify-content-center mb-1 mb-lg-2">
            <p className="h5 fs-lg-4 text-danger me-3">{recipientName}</p>
            <p className="h5 fs-lg-4 text-danger">{recipientPhone}</p>
          </div>
          <p className="h5 fs-lg-4 text-danger">{recipientAddress}</p>
        </Modal.Body>
        <Modal.Footer className="flex-column flex-lg-row-reverse align-items-stretch border-top-0 border-top-lg gap-3 gap-lg-4 pb-8 pb-lg-12 pt-0 pt-lg-8 px-0">
          <Button
            type="button"
            variant="filled-primary"
            shape="pill"
            size="lg"
            className="flex-grow-1 m-0"
            onClick={handleConfirmSubmit}
          >
            確認送出
          </Button>
          <Button
            type="button"
            variant="outline-neutral"
            shape="pill"
            size="lg"
            className="flex-grow-1 m-0"
            onClick={handleCloseConfirmModal}
          >
            繼續編輯
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SecondStep;
