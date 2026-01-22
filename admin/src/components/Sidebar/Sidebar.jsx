/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useMemo } from "react";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdAttachMoney,
  MdLocalOffer,
  MdRateReview,
  MdSettings,
  MdLogout,
  MdChevronRight,
  MdClose,
  MdStorefront,
  MdCategory,
  MdLayers,
  MdViewModule,
  MdPalette,
} from "react-icons/md";
import logo from "../../assets/logo.png";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = ({ mobileOpen, setMobileOpen, handleToggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const sidebarRef = useRef(null);

  const dropdownData = [
    {
      title: "Product",
      icon: <MdStorefront />,
      items: [
        { label: "Product List", link: "/product/list" },
        { label: "Add Product", link: "/product/add" },
      ],
    },
    {
      title: "Category",
      icon: <MdCategory />,
      items: [
        { label: "Category List", link: "/category/list" },
        { label: "Add Category", link: "/category/add" },
      ],
    },
    {
      title: "Sub Category",
      icon: <MdLayers />,
      items: [
        { label: "Sub Category List", link: "/sub-category/list" },
        { label: "Add Sub Category", link: "/sub-category/add" },
      ],
    },
    {
      title: "Sub Sub Category",
      icon: <MdViewModule />,
      items: [
        { label: "Sub Sub Category List", link: "/sub-sub-category/list" },
        { label: "Add Sub Sub Category", link: "/sub-sub-category/add" },
      ],
    },
    {
      title: "Color",
      icon: <MdPalette />,
      items: [
        { label: "Color List", link: "/color/list" },
        { label: "Add Color", link: "/color/add" },
      ],
    },
    {
      title: "User",
      icon: <MdPeople />,
      items: [
        { label: "Customer", link: "/user/customer" },
        { label: "Admin", link: "/user/admin" },
      ],
    },
  ];

  const staticLinks = [
    { label: "Dashboard", icon: <MdDashboard />, link: "/" },
    { label: "Orders", icon: <MdShoppingCart />, link: "/orders" },
    { label: "Coupons", icon: <MdLocalOffer />, link: "/coupons" },
    { label: "Transactions", icon: <MdAttachMoney />, link: "/transactions" },
    { label: "Reviews", icon: <MdRateReview />, link: "/reviews" },
    { label: "Settings", icon: <MdSettings />, link: "/settings" },
    { label: "Logout", icon: <MdLogout />, link: "/logout" },
  ];

  const dropdownRefs = useMemo(() => dropdownData.map(() => ({ current: null })), []);

  const handleDropdownClick = (e, index) => {
    e.preventDefault();
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleLinkClick = (label) => {
    setActiveLink(label);
    if (window.innerWidth <= 768) setMobileOpen(false);
  };

  useEffect(() => {
    dropdownRefs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.style.maxHeight = openDropdown === idx ? `${ref.current.scrollHeight}px` : "0px";
      };
    });
  }, [openDropdown]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        window.innerWidth <= 768 &&
        mobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      };
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [mobileOpen, setMobileOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ""}`}
    >
      <header className={styles.sidebarHeader}>
        <Link to="/" className={styles.headerLogo} onClick={handleToggleSidebar}>
          <img src={logo} alt="Logo" />
        </Link>
        <button className={styles.mobileCloseBtn} onClick={handleToggleSidebar}>
          <MdClose />
        </button>
      </header>

      <div className={styles.sidebarScrollArea}>
        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {staticLinks.slice(0, 1).map((link) => (
              <li className={styles.navItem} key={link.label}>
                <Link
                  to={link.link}
                  className={`${styles.navLink} ${activeLink === link.label ? styles.active : ""}`}
                  onClick={() => handleLinkClick(link.label)}
                >
                  {link.icon}
                  <span className={styles.navLabel}>{link.label}</span>
                </Link>
              </li>
            ))}

            {dropdownData.map((dropdown, index) => (
              <li
                key={dropdown.title}
                className={`${styles.navItem} ${styles.dropdownContainer} ${openDropdown === index ? styles.open : ""}`}
              >
                <Link
                  to="#"
                  className={`${styles.navLink} ${styles.dropdownToggle}`}
                  onClick={(e) => handleDropdownClick(e, index)}
                >
                  {dropdown.icon}
                  <span className={styles.navLabel}>{dropdown.title}</span>
                  <MdChevronRight className={styles.dropdownIcon} />
                </Link>

                <ul
                  className={styles.dropdownMenu}
                  ref={(el) => (dropdownRefs[index].current = el)}
                >
                  {dropdown.items.map((item) => (
                    <li className={styles.navItem} key={item.label}>
                      <Link
                        to={item.link}
                        className={`${styles.navLink} ${styles.dropdownLink} ${activeLink === item.label ? styles.active : ""}`}
                        onClick={() => handleLinkClick(item.label)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {staticLinks.slice(1).map((link) => (
              <li className={styles.navItem} key={link.label}>
                <Link
                  to={link.link}
                  className={`${styles.navLink} ${activeLink === link.label ? styles.active : ""}`}
                  onClick={() => handleLinkClick(link.label)}
                >
                  {link.icon}
                  <span className={styles.navLabel}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
