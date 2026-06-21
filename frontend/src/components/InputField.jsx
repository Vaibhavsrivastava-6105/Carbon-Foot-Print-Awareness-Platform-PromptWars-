export const InputField = ({ label, id, icon, unit, ...props }) => (
  <div className="input-group">
    {label && <label htmlFor={id} className="input-label">{label}</label>}
    <div className="input-wrapper">
      {icon && <div className="input-icon">{icon}</div>}
      <input id={id} className="input-field" {...props} />
      {unit && <div className="input-unit">{unit}</div>}
    </div>
  </div>
);
