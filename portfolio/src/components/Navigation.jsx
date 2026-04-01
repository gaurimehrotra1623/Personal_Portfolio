import './Navigation.css';

const Navigation = ({ activeSection, scrollToSection }) => {
  const navItems = ['home', 'about', 'projects', 'contact'];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item);
          }}
          className={`nav-item ${activeSection === item ? 'active' : ''}`}
        >
          {item}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
