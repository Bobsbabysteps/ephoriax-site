import { Link } from "react-router-dom";

type CTAButtonProps = {
  to?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

export default function CTAButton({ to, href, className = "", children }: CTAButtonProps) {
  if (href) {
    return (
      <a href={href} className={`inline-block ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to || "#"} className={`inline-block ${className}`}>
      {children}
    </Link>
  );
}