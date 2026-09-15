export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="scroll-wrapper">
        <div className="container--primary">
          <div className="footer__content">
            <div className="footer__content-top">
              <p className="footer-text footer__description tc--main-white">
                A pen for people who think in ink first, pixels second —
                built to keep up with both.
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
                    <a href="#colors" className="footer-link--white">
                      Colors
                    </a>
                    <a href="#order" className="footer-link--white">
                      Order
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
                  <a href="#" className="footer-link--gray">
                    Design
                  </a>
                  <a href="#" className="footer-link--gray">
                    Development
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
