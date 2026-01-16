import Dropdown from 'react-bootstrap/Dropdown';

function StatusDropdown({ isEnabled }) {
  return (
    <Dropdown className="checkout-dropdown min-w-5rem">
      <Dropdown.Toggle
        className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8"
        id="product-status"
      >
        {isEnabled ? '啟用' : '停用'}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        <Dropdown.Item href="#">啟用</Dropdown.Item>
        <Dropdown.Item href="#">停用</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default StatusDropdown;
