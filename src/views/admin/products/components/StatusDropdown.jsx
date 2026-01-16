import { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

function StatusDropdown({ isEnabled }) {
  const [title, setTitle] = useState(null);

  return (
    <Dropdown
      className="checkout-dropdown min-w-5rem"
      onSelect={eventKey => {
        setTitle(parseInt(eventKey) ? '啟用' : '停用');
      }}
    >
      <Dropdown.Toggle
        className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
        id="product-status"
      >
        {title || (isEnabled ? '啟用' : '停用')}
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
