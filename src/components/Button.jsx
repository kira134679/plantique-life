import { clsx } from 'clsx';

export default function Button({
  as,
  type,
  variant,
  shape,
  size,
  leftIcon,
  rightIcon,
  iconName,
  dataId,
  className,
  href,
  children,
  ...props
}) {
  const Component = as || (href ? 'a' : 'button');

  const mergedClassName = clsx(
    'btn',
    { [`custom-btn-${variant}`]: Boolean(variant) },
    { [`custom-btn-${shape}-${size}`]: Boolean(shape) && Boolean(size) },
    { 'custom-btn-icon-start': leftIcon },
    { 'custom-btn-icon-end': rightIcon },
    className,
  );

  return (
    <Component type={type} className={mergedClassName} data-id={dataId} href={href} {...props}>
      {leftIcon && <span className="custom-btn-icon material-symbols-rounded">{iconName}</span>}
      {children}
      {rightIcon && <span className="custom-btn-icon material-symbols-rounded">{iconName}</span>}
    </Component>
  );
}
