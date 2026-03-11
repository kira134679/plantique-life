import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { get, useFormContext, useWatch } from 'react-hook-form';

function RhfInputWithCounter(
  { id, labelText, isRequired = false, fieldName, maxTextLength, className, ...props },
  ref,
) {
  // --- React Hook Form ---
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // 使用 RHF 的 get 方法，來成功取出嵌套的 fieldName（如：bundle.0.description）對應的錯誤物件
  const error = get(errors, fieldName);

  const inputValue = useWatch({ control, name: fieldName });
  const actualValue = typeof inputValue === 'string' ? inputValue.trim() : '';

  // --- State ---
  const [isCompositing, setIsCompositing] = useState(false);
  const showError = error && !isCompositing; // 避免使用者在組字過程中產生的暫時性字元（如：ㄘㄨㄛ）觸發 zod 即時驗證，造成 UI 錯誤訊息閃爍問題

  return (
    <>
      <label className="form-label text-neutral-700 fs-7 d-flex" htmlFor={id}>
        {labelText}
        {isRequired && <span className="text-danger">*</span>}
        <span className="fs-xs ms-auto text-neutral-500 align-self-end">
          {actualValue.length >= 0 && `（${actualValue.length} / ${maxTextLength} 字）`}
        </span>
      </label>
      <input
        id={id}
        type="text"
        ref={ref}
        onCompositionStart={() => setIsCompositing(true)}
        onCompositionEnd={() => setIsCompositing(false)}
        className={clsx('form-control', showError && 'is-invalid', className)}
        {...props}
      />
      {showError && <div className="invalid-feedback d-block">{error.message}</div>}
    </>
  );
}

export default forwardRef(RhfInputWithCounter);
