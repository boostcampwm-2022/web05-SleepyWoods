import { useState } from 'react';
import { sidebarWrapper, sidebar, toggleButton } from './sidebar.styled';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav css={sidebarWrapper(isOpen)}>
      <section css={sidebar}></section>
      <button type="button" css={toggleButton} onClick={handleClick}></button>
    </nav>
  );
};

export default Sidebar;
