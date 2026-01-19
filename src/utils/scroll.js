export function scrollToTop({ waitForComplete = false, maxWait = 1000 } = {}) {
  // 不需要等待，直接滾動
  if (!waitForComplete) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  // 需要等待，回傳 Promise
  return new Promise(resolve => {
    // 已經在頂部或接近頂部
    if (window.scrollY <= 1) {
      resolve();
      return;
    }
    // 監聽 scroll 事件
    let resolved = false;
    function done() {
      if (resolved) return;
      resolved = true;
      window.removeEventListener('scroll', onScroll);
      resolve();
    }
    function onScroll() {
      if (window.scrollY <= 1) {
        done();
      }
    }
    window.addEventListener('scroll', onScroll);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 備用超時，防止滾動事件不觸發或卡住
    setTimeout(done, maxWait);
  });
}
