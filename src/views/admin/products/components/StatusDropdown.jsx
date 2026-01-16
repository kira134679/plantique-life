import { fetchProducts, updateProduct } from '@/slice/productSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';

function StatusDropdown({ product }) {
  // Redux
  const dispatch = useDispatch();
  const { pagination } = useSelector(state => state.product);

  // state
  const [disabled, setDisabled] = useState(false);

  // event handler
  const handleStatusSelect = async eventKey => {
    if (parseInt(eventKey, 10) === product.is_enabled) return;
    try {
      setDisabled(true);
      await dispatch(
        updateProduct({ id: product.id, data: { data: { ...product, is_enabled: parseInt(eventKey, 10) } } }),
      ).unwrap();
      await dispatch(fetchProducts({ page: pagination.current_page })).unwrap();
    } catch {
      // handle error
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Dropdown className="checkout-dropdown min-w-5rem" onSelect={eventKey => handleStatusSelect(eventKey)}>
      <Dropdown.Toggle
        className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
        id="product-status"
        disabled={disabled}
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
  );
}

export default StatusDropdown;
