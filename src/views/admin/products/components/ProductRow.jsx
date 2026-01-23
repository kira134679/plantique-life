import { memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { fetchProducts, updateProduct } from '@/slice/product/adminProductSlice';

import Button from '@/components/Button';

function ProductRow({ product, openDeleteModal }) {
  // --- Redux Hooks ---
  const dispatch = useDispatch();
  const {
    pagination: { current_page },
  } = useSelector(state => state.product);

  // --- Event Handlers ---
  const handleStatusSelect = async eventKey => {
    if (parseInt(eventKey, 10) === product.is_enabled) return;
    try {
      await dispatch(
        updateProduct({ id: product.id, data: { data: { ...product, is_enabled: parseInt(eventKey, 10) } } }),
      ).unwrap();
      await dispatch(fetchProducts({ page: current_page })).unwrap();
    } catch {
      // handle error
    }
  };

  return (
    <tr>
      <td>
        <div className="row g-0 align-items-center">
          <div className="col-4">
            <div className="me-4">
              <div className="ratio ratio-1x1">
                <img className="object-fit-cover" src={product.imageUrl} alt={product.title} />
              </div>
            </div>
          </div>
          <div className="col-8">
            <h4 className="h6 mb-2">{product.title}</h4>
            <p className="fs-sm text-neutral-400 text-truncate">{product.id}</p>
          </div>
        </div>
      </td>
      <td className="fs-7 text-primary-700 noto-serif-tc fw-bold">
        {product.price === product.origin_price ? (
          `NT$${product.price.toLocaleString()}`
        ) : (
          <>
            NT${product.price.toLocaleString()}
            <del className="ms-2 text-neutral-400 fs-sm">${product.origin_price.toLocaleString()}</del>
          </>
        )}
      </td>
      <td className="col-2">
        <span className="px-3 py-1 text-primary bg-primary-100 text-nowrap">{product.category}</span>
      </td>
      <td>
        <div>
          <Dropdown className="checkout-dropdown min-w-5rem" onSelect={eventKey => handleStatusSelect(eventKey)}>
            <Dropdown.Toggle
              className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
              id="product-status"
            >
              {product.is_enabled ? '啟用' : '停用'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item eventKey="1" as="button" type="button">
                啟用
              </Dropdown.Item>
              <Dropdown.Item eventKey="0" as="button" type="button">
                停用
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
      <td>
        <Button
          as={Link}
          to={`/admin/products/edit/${product.id}`}
          variant="outline-neutral"
          shape="circle"
          size="sm"
          className="me-2"
        >
          <span className="custom-btn-icon material-symbols-rounded">edit</span>
        </Button>
        <Button
          type="button"
          variant="outline-danger"
          shape="circle"
          size="sm"
          onClick={() => openDeleteModal(product.id)}
        >
          <span className="custom-btn-icon material-symbols-rounded">delete</span>
        </Button>
      </td>
    </tr>
  );
}

export default memo(ProductRow);
