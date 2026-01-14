import { Link, useParams } from 'react-router';

import productImg1 from 'assets/images/products/img_product_01.png';
import productImgDefault from 'assets/images/products/img_product_default.jpg';

import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../../components/Button';

function ProductEdit() {
  const { id } = useParams();
  const isUpdateMode = id !== undefined;

  // 模擬副圖卡片資料
  const imgCardData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <>
      <div className="container py-13">
        <h2 className="h3 mb-8">{isUpdateMode ? '更新商品' : '新增商品'}</h2>
        <form>
          <section className="py-6">
            <h3 className="h4 mb-6">基本設定</h3>
            {isUpdateMode ? (
              <div className="mb-4 w-50 min-w-14rem">
                <label className="form-label text-neutral-700 fs-7" htmlFor="product-id">
                  商品 ID
                </label>
                <input id="product-id" className="form-control" type="text" value={id} readOnly />
              </div>
            ) : null}
            <div className="mb-4 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-title`}
              >
                商品名稱<span className="text-danger">*</span>
              </label>
              <input
                id={`${isUpdateMode ? 'update-' : 'new-'}product-title`}
                className="form-control is-invalid"
                type="text"
                placeholder="請輸入商品名稱"
              />
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-4 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-category`}
              >
                類別<span className="text-danger">*</span>
              </label>
              <Dropdown className="checkout-dropdown zod-validated is-invalid">
                <Dropdown.Toggle
                  className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8 is-invalid"
                  id={`${isUpdateMode ? 'update-' : 'new-'}product-category`}
                >
                  請選擇商品類別
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item href="#">單品</Dropdown.Item>
                  <Dropdown.Item href="#">組盆</Dropdown.Item>
                  <Dropdown.Item href="#">禮盒</Dropdown.Item>
                  <Dropdown.Item href="#">配件</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-4 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-status`}
              >
                狀態<span className="text-danger">*</span>
              </label>
              <Dropdown className="checkout-dropdown">
                <Dropdown.Toggle
                  className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                  id={`${isUpdateMode ? 'update-' : 'new-'}product-status`}
                >
                  請選擇商品狀態
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item href="#">啟用</Dropdown.Item>
                  <Dropdown.Item href="#">停用</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="invalid-feedback">必填欄位</div>
            </div>
          </section>
          <section className="py-6">
            <h3 className="h4 mb-6">圖片設定</h3>
            <div className="mb-4">
              <p className="mb-2 text-neutral-700 fs-7">主圖設定</p>
              {/* 主圖卡片 */}
              <Card className="flex-shrink-0 upload-img-card uploaded">
                <div className="card-img-wrap position-relative overflow-hidden">
                  <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark z-1 rounded-bottom-0 card-img-overlay"></div>
                  <div className="ratio ratio-1x1">
                    <Card.Img variant="top" src={productImg1} className="w-100 object-fit-cover" />
                  </div>
                  <div className="position-absolute top-50 start-50 translate-middle z-2">
                    <input
                      className="d-none"
                      id={`${isUpdateMode ? 'update-' : 'new-'}product-main-image`}
                      type="file"
                      accept="image/*"
                    />
                    {/* 上傳圖片 */}
                    <div className="card-img-upload">
                      <Button
                        as="label"
                        htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-main-image`}
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
                    {/* 更換圖片、移除圖片 */}
                    <div className="card-img-actions gap-2">
                      <Button
                        as="label"
                        htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-main-image`}
                        variant="outline-neutral"
                        shape="circle"
                        size="md"
                      >
                        <span className="custom-btn-icon material-symbols-rounded">upload</span>
                      </Button>
                      <Button type="button" variant="outline-danger" shape="circle" size="md">
                        <span className="custom-btn-icon material-symbols-rounded">close</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Card.Body>
                  <input
                    id={`${isUpdateMode ? 'update-' : 'new-'}product-main-image-url`}
                    className="form-control"
                    type="url"
                    placeholder="請輸入圖片網址"
                  />
                  <div className="invalid-feedback">格式錯誤</div>
                </Card.Body>
              </Card>
            </div>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <p className="text-neutral-700 fs-7">其他圖片設定</p>
                <span className="ms-2 fs-sm bg-primary-100 px-3 py-1 ms-auto">0 / 5 已使用</span>
              </div>
              <div className="d-flex gap-4 overflow-x-auto">
                {/* 使用迴圈渲染副圖卡片 */}
                {imgCardData.map(card => (
                  <Card key={card.id} className="flex-shrink-0 upload-img-card">
                    <div className="card-img-wrap position-relative overflow-hidden">
                      <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark z-1 rounded-bottom-0 card-img-overlay"></div>
                      <div className="ratio ratio-1x1">
                        <Card.Img variant="top" src={productImgDefault} className="w-100 object-fit-cover" />
                      </div>
                      <div className="position-absolute top-50 start-50 translate-middle z-2">
                        <input
                          className="d-none"
                          id={`${isUpdateMode ? 'update-' : 'new-'}product-image-${card.id}`}
                          type="file"
                          accept="image/*"
                        />

                        <div className="card-img-upload">
                          <Button
                            as="label"
                            htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-image-${card.id}`}
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

                        <div className="card-img-actions gap-2">
                          <Button
                            as="label"
                            htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-image-${card.id}`}
                            variant="outline-neutral"
                            shape="circle"
                            size="md"
                          >
                            <span className="custom-btn-icon material-symbols-rounded">upload</span>
                          </Button>
                          <Button type="button" variant="outline-danger" shape="circle" size="md">
                            <span className="custom-btn-icon material-symbols-rounded">close</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Card.Body>
                      <input
                        id={`${isUpdateMode ? 'update-' : 'new-'}product-image-url-${card.id}`}
                        className="form-control"
                        type="url"
                        placeholder="請輸入圖片網址"
                      />
                      <div className="invalid-feedback">格式錯誤</div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section className="py-6">
            <h3 className="h4 mb-6">價格設定</h3>
            <div className="mb-4 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-origin-price`}
              >
                原價<span className="text-danger">*</span>
              </label>
              <div className="input-group is-invalid">
                <span className="input-group-text bg-primary-100">NT$</span>
                <input
                  id={`${isUpdateMode ? 'update-' : 'new-'}product-origin-price`}
                  className="form-control is-invalid"
                  type="number"
                  placeholder="請輸入原價"
                />
              </div>
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-4 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-price`}
              >
                售價<span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-primary-100">NT$</span>
                <input
                  id={`${isUpdateMode ? 'update-' : 'new-'}product-price`}
                  className="form-control"
                  type="number"
                  placeholder="請輸入售價"
                />
              </div>
              <div className="invalid-feedback">必填欄位</div>
            </div>
            <div className="mb-4 w-25 min-w-14rem">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-unit`}
              >
                單位<span className="text-danger">*</span>
              </label>
              <Dropdown className="checkout-dropdown">
                <Dropdown.Toggle
                  className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
                  id={`${isUpdateMode ? 'update-' : 'new-'}product-unit`}
                >
                  請選擇商品單位
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Dropdown.Item href="#">件</Dropdown.Item>
                  <Dropdown.Item href="#">盒</Dropdown.Item>
                  <Dropdown.Item href="#">包</Dropdown.Item>
                  <Dropdown.Item href="#">組</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="invalid-feedback">必填欄位</div>
            </div>
          </section>
          <section className="py-6">
            <h3 className="h4 mb-6">內容設定</h3>
            <div className="mb-4">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-content`}
              >
                商品內容
              </label>
              <textarea
                id={`${isUpdateMode ? 'update-' : 'new-'}product-content`}
                className="form-control min-h-20rem min-w-14rem"
              />
            </div>
            <div className="mb-4">
              <label
                className="form-label text-neutral-700 fs-7"
                htmlFor={`${isUpdateMode ? 'update-' : 'new-'}product-description`}
              >
                商品描述
              </label>
              <textarea
                id={`${isUpdateMode ? 'update-' : 'new-'}product-description`}
                className="form-control min-h-20rem min-w-14rem"
              />
            </div>
          </section>
          <div className="d-flex">
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
            <Button
              type="submit"
              variant="filled-primary"
              shape="pill"
              size="sm"
              onClick={e => {
                e.preventDefault();
              }}
            >
              {isUpdateMode ? '儲存變更' : '新增商品'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductEdit;
