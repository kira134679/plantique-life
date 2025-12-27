export default function Breadcrumb({ items }) {
  return (
    <nav style={{ '--bs-breadcrumb-divider': '"chevron_right"' }} aria-label="breadcrumb">
      <ol className="breadcrumb fs-sm fs-lg-8 row-gap-2 mb-0">
        {items.map((item, i) => (
          <li className={`breadcrumb-item d-flex align-items-center ${i === items.length - 1 ? 'active' : ''}`}>
            {i === items.length - 1 ? item.name : <a href={item.link}>{item.name}</a>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
