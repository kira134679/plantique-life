import { memo, useEffect, useRef } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import {
  BUNDLE_DESCRIPTION_MAX_LENGTH,
  BUNDLE_EN_NAME_MAX_LENGTH,
  BUNDLE_LABEL_MAP,
  BUNDLE_TITLE_MAX_LENGTH,
  MAX_BUNDLE_COUNT,
} from '../constants';

import Button from '@/components/Button';
import RhfInputWithCounter from './RhfInputWithCounter';
import RhfTextareaWithCounter from './RhfTextareaWithCounter';

const EMPTY_BUNDLE_DEFAULT_VALUES = { title: '', enName: '', description: '' };

function BundleSection({ getFieldId }) {
  // --- React Hook Form ---
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'bundle' });

  // 即時監測商品類型，用以控制 bundle 區塊顯示與判斷
  const category = useWatch({ control, name: 'category' });

  // --- Derived State ---
  const bundlePrefix = BUNDLE_LABEL_MAP[category] || null;
  const canHaveBundle = !!bundlePrefix;

  const bundleLength = fields.length;
  const isBundleFull = bundleLength >= MAX_BUNDLE_COUNT;
  const isBundleEmpty = bundleLength === 0;

  // --- Ref ---
  const prevCategoryRef = useRef(null);

  // --- Event Handlers ---
  const handleAddBundle = () => {
    if (!canHaveBundle || bundleLength >= MAX_BUNDLE_COUNT) return;
    append(EMPTY_BUNDLE_DEFAULT_VALUES);
  };

  const handleRemoveBundle = index => {
    remove(index);
  };

  // --- Side Effects ---
  // 使商品類別屬於「可以新增內容物」的類別時，欄位上即有一組填寫欄位，提醒使用者此商品可新增內容物
  // 僅在商品類別有更動時觸發（商品第一次載入或使用者手動更換類別），若欄位為空，補上一組填寫欄位作為提示
  // 使用者手動刪除時，仍可刪除全部欄位
  useEffect(() => {
    if (category === prevCategoryRef.current) return;
    prevCategoryRef.current = category;

    if (!canHaveBundle || bundleLength > 0) return;
    append(EMPTY_BUNDLE_DEFAULT_VALUES, { shouldFocus: false });
  }, [category, canHaveBundle, bundleLength, append]);

  // --- UI Renderer ---
  const addBundleBtn = (
    <Button
      type="button"
      variant="filled-primary"
      shape="pill"
      size="sm"
      rightIcon={!isBundleFull}
      iconName="add"
      className="mx-auto"
      onClick={handleAddBundle}
      disabled={isBundleFull}
    >
      {isBundleFull ? `最多僅可新增 ${MAX_BUNDLE_COUNT} 個${bundlePrefix}內容` : `新增${bundlePrefix}內容`}
    </Button>
  );

  return (
    <>
      {canHaveBundle && (
        <section className="py-6 border border-2 p-6 mb-10">
          <div className="mb-4">
            <div className="d-flex align-items-center mb-8">
              <h3 className="h4 text-primary-700">內容物設定</h3>
              {
                <span className="ms-2 fs-sm bg-primary-100 px-3 py-1 ms-auto">
                  {bundleLength} / {MAX_BUNDLE_COUNT} 已使用
                </span>
              }
            </div>
            {/* 空狀態 */}
            {isBundleEmpty && (
              <div className="text-center py-8 bg-neutral-100 mb-4">
                <p className="text-neutral-400">目前沒有{bundlePrefix}內容</p>
                {/* 新增按鈕 */}
                <div className="text-center mt-8">{addBundleBtn}</div>
              </div>
            )}
            {/* 內容物列表 */}
            {!isBundleEmpty && (
              <>
                {fields.map((field, index) => (
                  <div className="mb-6 p-7 bg-neutral-100" key={field.id}>
                    <div className="d-flex align-items-center justify-content-between mb-7">
                      {/* 內容物編號 */}
                      <h4 className="h5 border-start border-5 border-primary-700 py-1 px-4">
                        {/* text-light bg-primary-700 ps-8 */}
                        {bundlePrefix}內容 <span className="fs-6">#{index + 1}</span>
                      </h4>
                      {/* 刪除按鈕 */}
                      <Button
                        type="button"
                        variant="outline-danger"
                        shape="circle"
                        size="sm"
                        onClick={() => handleRemoveBundle(index)}
                      >
                        <span className="custom-btn-icon material-symbols-rounded">delete</span>
                      </Button>
                    </div>
                    <div className="d-flex gap-6">
                      {/* 內容物名稱 */}
                      <div className="mb-3 w-50">
                        <RhfInputWithCounter
                          fieldName={`bundle.${index}.title`}
                          labelText={`${bundlePrefix}名稱`}
                          maxTextLength={BUNDLE_TITLE_MAX_LENGTH}
                          id={`${getFieldId('bundle-title')}-${index + 1}`}
                          type="text"
                          placeholder={bundlePrefix && `請輸入${bundlePrefix}名稱`}
                          {...register(`bundle.${index}.title`)}
                        />
                      </div>
                      {/* 內容物英文名 */}
                      <div className="mb-3 w-50">
                        <RhfInputWithCounter
                          fieldName={`bundle.${index}.enName`}
                          labelText={`${bundlePrefix}英文名`}
                          maxTextLength={BUNDLE_EN_NAME_MAX_LENGTH}
                          id={`${getFieldId('bundle-en-name')}-${index + 1}`}
                          type="text"
                          placeholder={bundlePrefix && `請輸入${bundlePrefix}英文名`}
                          {...register(`bundle.${index}.enName`)}
                        />
                      </div>
                    </div>
                    {/* 內容物描述 */}
                    <div>
                      <RhfTextareaWithCounter
                        fieldName={`bundle.${index}.description`}
                        labelText={`${bundlePrefix}描述`}
                        maxTextLength={BUNDLE_DESCRIPTION_MAX_LENGTH}
                        rows={6}
                        id={`${getFieldId('bundle-description')}-${index + 1}`}
                        placeholder={`請輸入${bundlePrefix}描述（限制 ${BUNDLE_DESCRIPTION_MAX_LENGTH} 字以內）`}
                        {...register(`bundle.${index}.description`)}
                      />
                    </div>
                  </div>
                ))}
                {/* 新增按鈕 */}
                {<div className="text-center">{addBundleBtn}</div>}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default memo(BundleSection);
