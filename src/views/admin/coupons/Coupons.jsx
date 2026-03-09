import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, fetchCoupons, updateCoupon } from '../../../slice/coupon/adminCouponSlice';
import Pagination from '../../../components/Pagination';
import toast from 'react-hot-toast';

function Coupons() {
  const dispatch = useDispatch();
  const { coupons, pagination } = useSelector(state => state.adminCoupon);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCoupons({ page }));
  }, [dispatch, page]);

  // Modal 資料控制
  const [show, setShow] = useState(false);
  const openModal = id => {
    setDeleteId(id);
    setShow(true);
  };
  const handleDelete = () => {
    dispatch(deleteCoupon(deleteId));
    setShow(false);
  };

  const handleStatusChange = async (coupon, eventKey) => {
    const newState = parseInt(eventKey, 10);
    if (coupon.is_enabled === newState) return;

    try {
      await dispatch(
        updateCoupon({
          id: coupon.id,
          data: {
            ...coupon,
            is_enabled: newState,
          },
        }),
      ).unwrap();
      dispatch(fetchCoupons({ page }));
      toast.success('修改成功');
    } catch {
      toast.error('修改失敗');
    }
  };

  return (
    <>
      <div className="py-13">
        <h2 className="h3 mb-4">優惠券管理</h2>
        <Button
          as={Link}
          to="/admin/coupons/edit"
          variant="filled-primary"
          shape="pill"
          size="sm"
          rightIcon={true}
          iconName="add"
          className="ms-auto w-fit"
        >
          新增優惠券
        </Button>
        <section className="table-responsive py-10">
          <table className="table align-middle">
            {/* 優惠券列表表頭 */}
            <thead>
              <tr>
                <th scope="col" className="text-neutral-400 fw-medium">
                  名稱
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  折扣
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  結束時間
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  狀態
                </th>
                <th scope="col" className="text-neutral-400 fw-medium">
                  操作
                </th>
              </tr>
            </thead>
            {/* 優惠券列表*/}
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td>
                    <h4 className="fs-7 mb-2 p-1 bg-primary-100 d-inline-block">{coupon.title}</h4>
                    <p className="fs-sm text-neutral-400 text-truncate">{coupon.code}</p>
                  </td>
                  <td className="fs-6 text-primary-700 noto-serif-tc fw-bold">{coupon.percent} %</td>
                  <td>
                    <p>{new Date(coupon.due_date * 1000).toLocaleString()}</p>
                  </td>
                  <td>
                    <Dropdown className="checkout-dropdown" onSelect={eventKey => handleStatusChange(coupon, eventKey)}>
                      <Dropdown.Toggle className="btn bg-transparent border w-100 text-start text-neutral-500 fs-sm fs-lg-8">
                        {coupon.is_enabled ? '啟用' : '停用'}
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
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/coupons/edit/${coupon.id}`}
                      variant="outline-neutral"
                      shape="circle"
                      size="sm"
                      iconName="edit"
                      className="me-2"
                    >
                      <span className="material-symbols-rounded d-block">edit</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline-danger"
                      shape="circle"
                      size="sm"
                      iconName="edit"
                      onClick={() => openModal(coupon.id)}
                    >
                      <span className="material-symbols-rounded d-block">delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* 頁碼 */}
        <div className="pb-10">
          <p className="text-end text-neutral-400 mb-8">每頁顯示 10 列，總共 {pagination.total_pages} 頁</p>
          <Pagination
            className="justify-content-end"
            currentPage={pagination?.current_page}
            totalPages={pagination?.total_pages}
            onPageChange={page => setPage(page)}
          />
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} contentClassName="rounded-0" size="sm" centered>
        <Modal.Header closeButton className="border-bottom-0 p-6">
          <Modal.Title className="h5 text-primary">刪除優惠券</Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-6 py-1">
          <p className="text-center">確定要將優惠券刪除嗎？</p>
        </Modal.Body>

        <Modal.Footer className="border-top-0 justify-content-center gap-3 p-6">
          <Button
            type="button"
            variant="filled-primary"
            size="sm"
            shape="square"
            className="bg-neutral-400 m-0"
            onClick={() => setShow(false)}
          >
            取消
          </Button>
          <Button
            type="button"
            variant="filled-primary"
            size="sm"
            shape="square"
            className="m-0"
            onClick={handleDelete}
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Coupons;
