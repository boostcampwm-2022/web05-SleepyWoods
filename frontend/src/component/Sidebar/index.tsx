import { useState } from 'react';
import { sidebarWrapper, sidebar, toggleButton } from './sidebar.styled';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section css={sidebarWrapper}>
      <nav css={sidebar(isOpen)}></nav>
      <button
        type="button"
        css={toggleButton(isOpen)}
        onClick={handleClick}></button>
    </section>
  );
};

export default Sidebar;
