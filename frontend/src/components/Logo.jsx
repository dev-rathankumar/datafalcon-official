import { Link } from "react-router-dom";
import logo from "../assets/kaizen-logo-2.svg";

export default function Logo({ height = 70, to = "/" }) {
  const image = (
    <img
      src={logo}
      alt="Kaizen Agentics"
      height={height}
      style={{ width: "auto", display: "block" }}
    />
  );

  if (!to) return image;

  return (
    <Link
      to={to}
      style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", lineHeight: 0 }}
    >
      {image}
    </Link>
  );
}
