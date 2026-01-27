import clsx from 'clsx';
import DatePicker from 'react-datepicker';

function OrderDatePicker({ id, selectsRange, date, setDate, className = '', includeTime = false, disabled = false }) {
  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(':');
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setDate(targetDate);
  };

  return (
    <DatePicker
      id={id}
      selectsRange={selectsRange}
      // 如果是範圍選擇，則傳入 startDate 和 endDate，否則傳入 selected
      startDate={selectsRange ? date[0] : null}
      endDate={selectsRange ? date[1] : null}
      selected={selectsRange ? null : date}
      dateFormat={includeTime ? 'yyyy/MM/dd HH:mm:ss' : 'yyyy/MM/dd'}
      showTimeInput={includeTime}
      customTimeInput={<CustomTimeInput onChangeCustom={handleChangeTime} />}
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

// 自訂時間輸入框
const CustomTimeInput = ({ date, onChangeCustom }) => {
  const value = date instanceof Date && !isNaN(date) ? date.toLocaleTimeString('it-IT') : '';
  return (
    <input
      type="time"
      step="1"
      value={value}
      onChange={event => onChangeCustom(date, event.target.value)}
      className="form-control form-control-sm"
    />
  );
};

export default OrderDatePicker;
