import { initials } from "../../utils/format.js";
export default function Avatar({ src, name = "", size = 36, className = "" }) {
  return src ? (
    <img
      src={src}
      alt={name}
      style={{ width: size, height: size }}
      className={`rounded-full object-cover ring-2 ring-background ${className}`}
    />
  ) : (
    <div
      style={{ width: size, height: size, fontSize: size / 2.6 }}
      className={`grid place-items-center rounded-full bg-primary text-primary-foreground font-semibold ${className}`}
    >
      {initials(name)}
    </div>
  );
}