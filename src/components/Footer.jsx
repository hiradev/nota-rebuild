export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="scroll-wrapper">
        <div className="container--primary">
          <div className="footer__content">
            <div className="footer__content-top">
              <p className="footer-text footer__description tc--main-white">
                NŌTA creates tools that respect the way people think and write.
                <br />
                Natural handwriting, quietly connected to digital structure.
              </p>
              <div className="footer__info-wrapper">
                <div className="footer__menu">
                  <span className="footer-title tc--main-white-55">
                    Navigation
                  </span>
                  <div className="footer__links menu-link tc--main-white">
                    <a href="#specs" className="footer-link--white">
                      Specifications
                    </a>
                    <a href="#who" className="footer-link--white">
                      Who it&apos;s for
                    </a>
                    <a href="#about" className="footer-link--white">
                      About
                    </a>
                    <a href="#inside" className="footer-link--white">
                      Inside the box
                    </a>
                  </div>
                </div>
                <div className="footer__year">
                  <span className="footer-title tc--main-white-55">Year</span>
                  <span className="footer-text tc--main-white">2026</span>
                </div>
              </div>
            </div>

            <div className="footer__content-bottom">
              <span className="footer-title tc--main-white-50">
                © 2026 NŌTA. All rights reserved.
              </span>
              <div className="footer__team-wrapper">
                <div className="footer__team menu-link tc--main-white-50">
                  <a href="mailto:hello@nota.pen" className="footer-link--gray">
                    hello@nota.pen
                  </a>
                  <span className="dot" />
                  <a href="#privacy" className="footer-link--gray">
                    Privacy
                  </a>
                </div>
                <div className="footer__design-team menu-link tc--main-white-50">
                  <a
                    href="https://taptop.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link--gray"
                  >
                    Made in Taptop
                  </a>
                  <a
                    href="https://www.behance.net/alicem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link--gray"
                  >
                    Designed by Alice
                  </a>
                  <a
                    href="https://www.uprock.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link--gray"
                  >
                    &amp; UPROCK Studio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
