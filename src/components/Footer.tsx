const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-tertiary">
          © 2026 Junriel Pajal. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#services" className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">Services</a>
          <a href="#work" className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">Work</a>
          <a href="#contact" className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
