import clsx from 'clsx';
import ReactPaginate from 'react-paginate';
import { scrollToTop } from '../utils/scroll';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  autoScroll = true,
  pageRange = 3,
  marginPages = 1,
  className,
  ...props
}) => {
  if (!totalPages || totalPages < 0) return null;

  const handlePageChange = e => {
    const targetPage = e.selected + 1; // e.selected 是被使用者選取的頁數 index，實際頁數是 index + 1
    if (autoScroll) scrollToTop();
    onPageChange(targetPage);
  };

  return (
    <ReactPaginate
      // 頁數設定
      forcePage={currentPage - 1} // react-paginate 的頁數是從 0 開始做為第一頁，也就是頁數 index = 實際頁數 - 1
      pageCount={totalPages}
      onPageChange={handlePageChange}
      pageRangeDisplayed={pageRange} //目前頁數與其前後頁共需顯示幾個頁碼
      marginPagesDisplayed={marginPages} //頁碼頭尾至少需顯示幾個頁碼
      // 樣式設定
      containerClassName={clsx('pagination custom-pagination gap-4', className)}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link page-nav-link"
      nextClassName="page-item"
      nextLinkClassName="page-link page-nav-link"
      breakClassName="page-item"
      breakLinkClassName="page-link disabled-break"
      activeClassName="active"
      // 符號設定
      breakLabel="..."
      nextLabel={<span className="material-symbols-rounded p-2"> chevron_right </span>}
      previousLabel={<span className="material-symbols-rounded p-2"> chevron_left </span>}
      // 其他
      renderOnZeroPageCount={null}
      {...props}
    />
  );
};

export default Pagination;
