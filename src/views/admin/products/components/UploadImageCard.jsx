import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { uploadApi } from '@/api';
import { IMAGE_UPLOAD_REMIND_MESSAGE } from '../constants';

import Button from '@/components/Button';

import productImgDefault from 'assets/images/products/img_product_default.jpg';

function UploadImageCard({ fileFieldName, urlFieldName, fileFieldId, urlFieldId }) {
  // --- React Hook Form ---
  const {
    control,
    register,
    getValues,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  // 即時監測網址欄位和檔案欄位的值
  const fileValue = useWatch({ control, name: fileFieldName });
  const urlValue = useWatch({ control, name: urlFieldName });

  // --- Local State ---
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFileUrlCopied, setIsFileUrlCopied] = useState(false);

  // --- Ref ---
  const fileInputRef = useRef(null);

  // --- Logic Helpers ---
  // 如果有圖片上傳，則轉為檔案上傳模式，隱藏網址輸入框
  const fileMode = !!(fileValue && fileValue.length > 0);

  const fileActionButtonText = (() => {
    // 例外情況：已選擇圖片檔案，但未上傳到後端
    if (errors[fileFieldName] && errors[fileFieldName].message !== IMAGE_UPLOAD_REMIND_MESSAGE) {
      return '無法上傳';
    }
    if (uploadedUrl) {
      return isFileUrlCopied ? '複製成功！' : '複製圖片網址';
    }
    return '確認上傳';
  })();

  // --- Event Handlers ---
  const handleClearImage = () => {
    setValue(fileFieldName, null);
    setValue(urlFieldName, '');

    setPreviewUrl(null);
    setUploadedUrl(null);

    // 重新對圖片進行驗證，因為 setValue 不會觸發 onChange 事件
    trigger([urlFieldName, fileFieldName]);

    // 將 file input 中殘留的值清空，避免重新選擇同一張圖片時，不會觸發 onChange
    // 避免的錯誤情境：圖A重新上傳，或圖A換成圖B後又換回圖A時
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));

    setValue(urlFieldName, ''); // 若已選擇圖片，即初始化 url 欄位的值，避免 url 欄位的錯誤訊息殘留
    trigger(urlFieldName); // 手動重新觸發，確保 url 欄位進行主圖必填的驗證
  };

  const handleFileActionClick = () => {
    if (!uploadedUrl) handleUploadImage();
    else handleCopyUrl();
  };

  const handleUploadImage = async () => {
    const file = getValues(fileFieldName)[0];
    if (!file) return;
    try {
      setIsFileUploading(true);

      const formData = new FormData();
      formData.append('file-to-upload', file);

      const response = await uploadApi.upload(formData);
      toast.success('圖片上傳成功！');

      setIsFileUploading(false);
      setUploadedUrl(response.imageUrl);
      setValue(urlFieldName, response.imageUrl); // 將網址輸入框的內容替換為 API 回傳的圖片網址
      setPreviewUrl(null);

      // 手動清除「已選擇圖片但未上傳」的錯誤訊息
      if (errors[fileFieldName]?.type === 'manual') {
        clearErrors(fileFieldName);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCopyUrl = async () => {
    if (!uploadedUrl) return;
    try {
      await navigator.clipboard.writeText(uploadedUrl);
      toast.success('網址已複製！');
      setIsFileUrlCopied(true);
    } catch {
      toast.error('網址複製失敗！');
    }
  };

  // --- Side Effects ---
  // 當 previewUrl 改變或元件 unmount 時，自動回收舊的 blob
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 當商品 ID 被複製時，自動計時 3 秒再回復為未複製狀態
  // 當新計時器產生或元件 unmount 時，自動回收舊的計時器
  useEffect(() => {
    if (!isFileUrlCopied) return;

    const timerId = setTimeout(() => {
      setIsFileUrlCopied(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isFileUrlCopied]);

  return (
    <Card
      className={clsx(
        'flex-shrink-0 upload-img-card',
        urlValue && 'uploaded',
        fileValue && 'uploaded',
        errors[fileFieldName] && 'is-invalid',
      )}
    >
      <div className="card-img-wrap position-relative overflow-hidden">
        <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark z-1 rounded-bottom-0 card-img-overlay"></div>
        <div className="ratio ratio-1x1 border-bottom border-1">
          {/* 圖片 */}
          <Card.Img
            variant="top"
            src={uploadedUrl || previewUrl || urlValue || productImgDefault}
            className="w-100 object-fit-cover"
          />
        </div>
        <div className="position-absolute top-50 start-50 translate-middle z-2">
          {/* 檔案 Input */}
          <input
            className="d-none"
            id={fileFieldId}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            {...register(fileFieldName, {
              onChange: e => {
                handleFileChange(e);
              },
            })}
            ref={e => {
              register(fileFieldName).ref(e);
              fileInputRef.current = e;
            }}
          />
          {/* 檔案上傳按鈕 */}
          <div className="card-img-upload">
            <Button
              as="label"
              htmlFor={fileFieldId}
              variant="outline-neutral"
              shape="pill"
              size="sm"
              rightIcon={true}
              iconName="add"
              className="text-nowrap"
            >
              新增圖片
            </Button>
          </div>
          {/* Hover 時出現的操作 */}
          <div className="card-img-actions gap-2">
            {/* 檔案重新上傳按鈕 */}
            <Button as="label" htmlFor={fileFieldId} variant="outline-neutral" shape="circle" size="md">
              <span className="custom-btn-icon material-symbols-rounded">upload</span>
            </Button>
            {/* 清除圖片按鈕（檔案與網址） */}
            <Button type="button" variant="outline-danger" shape="circle" size="md" onClick={handleClearImage}>
              <span className="custom-btn-icon material-symbols-rounded">close</span>
            </Button>
          </div>
        </div>
      </div>
      <Card.Body>
        {/* 檔案模式操作 */}
        {/* 將圖片上傳到 API / 複製 API 回傳的圖片網址 */}
        {fileMode && (
          <Button
            type="button"
            variant="filled-primary"
            className="w-100"
            onClick={handleFileActionClick}
            disabled={
              // 例外情況：已選擇圖片檔案，但未上傳到後端
              (errors[fileFieldName] && errors[fileFieldName].message !== IMAGE_UPLOAD_REMIND_MESSAGE) ||
              isFileUploading ||
              isFileUrlCopied
            }
          >
            {fileActionButtonText}
          </Button>
        )}
        {/* 網址模式操作 */}
        {/* 網址輸入框 */}
        {!fileMode && (
          <input
            id={urlFieldId}
            className={clsx('form-control', errors[urlFieldName] && 'is-invalid')}
            type="url"
            placeholder="請輸入圖片網址"
            {...register(urlFieldName)}
          />
        )}
        {/* 錯誤訊息 */}
        {/* 一次只顯示一種，優先顯示檔案錯誤 */}
        {errors[fileFieldName] && <div className="invalid-feedback d-block">{errors[fileFieldName].message}</div>}
        {!errors[fileFieldName] && errors[urlFieldName] && (
          <div className="invalid-feedback d-block">{errors[urlFieldName].message}</div>
        )}
      </Card.Body>
    </Card>
  );
}

export default memo(UploadImageCard);
