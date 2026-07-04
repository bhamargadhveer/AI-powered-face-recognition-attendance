export default function Card({ className = "", children, ...rest }) {
  return (
    <div
      className={`rounded-2xl bg-card text-card-foreground border border-border card-shadow ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}