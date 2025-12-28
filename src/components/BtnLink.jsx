function BtnLink({ color, rightIcon, btnText }) {
  return (
    <button
      className={`btn custom-btn-link-${color} custom-btn-link-sm ${rightIcon ? 'custom-btn-icon-end' : ''} `}
      type="button"
    >
      {btnText}
      {rightIcon && <span className="custom-btn-icon material-symbols-rounded"> arrow_right_alt </span>}
    </button>
  );
}
export default BtnLink;
