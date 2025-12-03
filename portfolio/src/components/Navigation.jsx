import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = ({ activeSection, scrollToSection }) => {
  const navItems = ['home', 'about', 'projects', 'contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navigation"
    >
      {navItems.map((item) => (
        <motion.button
          key={item}
          onClick={() => scrollToSection(item)}
          className={`nav-item ${activeSection === item ? 'active' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </motion.button>
      ))}
    </motion.nav>
  );
};

export default Navigation;
