export const Card = ({ children, className = '' }) => (
  <div className={`glass-panel ${className}`}>
    {children}
  </div>
);
