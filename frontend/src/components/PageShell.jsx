import { T } from "../theme";
import GlobalStyles from "./GlobalStyles";
import Nav from "./Nav";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: "'Inter',sans-serif", overflowX: "hidden" }}>
      <GlobalStyles />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
