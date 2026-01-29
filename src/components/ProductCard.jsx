import { useState } from 'react';
import { Link } from 'react-router';
import Button from './Button';

export default function ProductCard({ id, title, imageUrl, alt, tag, originPrice, price, ...props }) {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className={`card rounded-0 border-0 product-card ${props.className || ''}`} {...props}>
      <div className="position-relative overflow-hidden product-card-img-height">
        <img
          src={imageUrl}
          className="card-img-top rounded-0 h-100 w-100 object-fit-cover product-card-img"
          alt={alt || ''}
        />
        <div className="position-absolute favorite-btn">
          <Button
            type="button"
            variant="fav"
            className={`${isFav ? 'active' : ''}`}
            onClick={() => setIsFav(prev => !prev)}
          >
            <span className="custom-btn-icon material-symbols-rounded"> favorite </span>
          </Button>
        </div>
      </div>
      <div className="card-body p-0 pt-3 pt-lg-5">
        <span
          className={`fs-xs fs-lg-sm px-2 px-lg-3 py-1 ${tag === '質感精選' ? 'text-primary bg-primary-100' : 'text-secondary bg-secondary-100'}`}
        >
          {tag}
        </span>

        <div className="d-flex justify-content-between align-items-center mt-1 mt-lg-2">
          <div className="d-flex flex-column justify-content-between">
            <h5 className="card-title fs-6 fs-lg-5 fw-bold mb-1 mb-lg-2">
              <Link to={`/products/${id}`} className="stretched-link text-decoration-none text-neutral-700">
                {title}
              </Link>
            </h5>
            <div className="d-flex flex-column flex-xl-row align-items-baseline">
              <p className="card-text fs-7 fs-lg-6 text-primary-700 fw-bold noto-serif-tc lh-sm">{price}</p>
              {originPrice && (
                <p className="card-text fs-sm text-neutral-400 noto-serif-tc text-decoration-line-through ms-xl-2 mt-2 mt-xl-0">
                  {originPrice}
                </p>
              )}
            </div>
          </div>
          <button type="button" className="btn bg-transparent border-0 p-0">
            <span className="material-symbols-rounded text-neutral-700 p-2 p-lg-3"> shopping_cart </span>
          </button>
        </div>
      </div>
    </div>
  );
}
