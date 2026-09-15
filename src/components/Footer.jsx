export default function Footer({ data, nav, id = "about" }) {
  const tagline = data?.tagline || "";
  const contactLinks = data?.contactLinks || [];
  const creditLinks = data?.creditLinks || [];
  const copyrightText = data?.copyrightText || "";
  const navLinks = nav || [];
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id={id} data-header-theme="dark">
      <div className="scroll-wrapper">
        <div className="container--primary">
          <div className="footer__content">
            <div className="footer__content-top">
              <p className="footer-text footer__description tc--main-white">
                {tagline.split("\n").map((line, i, arr) => (
                  <span key={line}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
              <div className="footer__info-wrapper">
                <div className="footer__menu">
                  <span className="footer-title tc--main-white-55">
                    Navigation
                  </span>
                  <nav aria-label="Footer">
                    <ul className="footer__links menu-link tc--main-white">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} className="footer-link--white">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="footer__year">
                  <span className="footer-title tc--main-white-55">Year</span>
                  <span className="footer-text tc--main-white">{year}</span>
                </div>
              </div>
            </div>

            <div className="footer__content-bottom">
              <span className="footer-title tc--main-white-50">{copyrightText}</span>
              <div className="footer__team-wrapper">
                <div className="footer__team menu-link tc--main-white-50">
                  {contactLinks.map((link, i) => (
                    <span key={link.href} style={{ display: "contents" }}>
                      <a
                        href={link.href}
                        className="footer-link--gray"
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                      {i < contactLinks.length - 1 ? <span className="dot" /> : null}
                    </span>
                  ))}
                </div>
                <div className="footer__design-team menu-link tc--main-white-50">
                  {creditLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="footer-link--gray"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
