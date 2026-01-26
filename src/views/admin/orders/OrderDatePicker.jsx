import clsx from 'clsx';
import DatePicker from 'react-datepicker';

function OrderDatePicker({ id, selectsRange, date, setDate, className = '', disabled = false }) {
  return (
    <DatePicker
      id={id}
      selectsRange={selectsRange}
      // 如果是範圍選擇，則傳入 startDate 和 endDate，否則傳入 selected
      startDate={selectsRange ? date[0] : null}
      endDate={selectsRange ? date[1] : null}
      selected={selectsRange ? null : date}
      dateFormat="yyyy/MM/dd"
      onChange={update => setDate(update)}
      disabled={disabled}
      placeholderText={selectsRange ? '選擇日期範圍' : '選擇日期'}
      isClearable
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      className={clsx('form-control admin-orders-daypicker', className)}
    />
  );
}

export default OrderDatePicker;
