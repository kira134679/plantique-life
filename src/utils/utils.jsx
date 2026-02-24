export function timestampToDate(timestamp) {
  const datetime = new Date(timestamp * 1000);
  const datetimeArr = [
    datetime.getFullYear(),
    String(datetime.getMonth() + 1).padStart(2, '0'),
    String(datetime.getDate()).padStart(2, '0'),
  ];
  return datetimeArr.join('/');
}

export function clamp(value, min, max) {
  if (value < min) return min;

  if (value > max) return max;

  return value;
}

/**
 * 安全解析 JSON 字串。
 * 解析成功時回傳結果，失敗時回傳預設值。
 *
 * @param {string} jsonStr 要解析的 JSON 字串。
 * @param {*} [fallback={}] 解析失敗時回傳的預設值。
 * @returns {*} 解析後的資料，或是預設值 `fallback`。
 */
export function tryParseJson(jsonStr, fallback = {}) {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return fallback;
  }
}
