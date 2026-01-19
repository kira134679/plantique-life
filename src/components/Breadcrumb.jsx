import { useMatches } from 'react-router';

export default function Breadcrumb() {
  const matches = useMatches();

  const crumbs = matches
    .filter(match => match.handle?.breadcrumb)
    .map(m => ({ label: m.handle.breadcrumb(m), to: m.pathname }));

  return (
    <nav style={{ '--bs-breadcrumb-divider': '"chevron_right"' }} aria-label="breadcrumb">
      <ol className="breadcrumb fs-sm fs-lg-8 row-gap-2 mb-0">
        {crumbs.map((item, idx, arr) => (
          <li
            className={`breadcrumb-item d-flex align-items-center ${idx === arr.length - 1 ? 'active' : ''}`}
            key={item.to}
          >
            {idx === arr.length - 1 ? item.label : <a href={item.to}> {item.label} </a>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
