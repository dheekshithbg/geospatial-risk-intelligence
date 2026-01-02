import './Footer.css';
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
         <p className='text-center mt-4'>
          © {(new Date().getFullYear())} Made with ♥️ by <strong>Dheekshith B G</strong>. All rights reserved.
        </p>
        <div className='footer-tagline'>
          {socialLinks.map((link) => (
            <a key={link.name} href={link.link} target='_blank' rel='noopener noreferrer'>
              <img
                src={link.iconUrl}
                alt={link.name}
                className='social-icon'
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
