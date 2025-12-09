export function timestampToDate(timestamp) {
  const datetime = new Date(timestamp * 1000);
  const datetimeArr = [
    datetime.getFullYear(),
    String(datetime.getMonth() + 1).padStart(2, '0'),
    String(datetime.getDate()).padStart(2, '0'),
  ];
  return datetimeArr.join('/');
}
