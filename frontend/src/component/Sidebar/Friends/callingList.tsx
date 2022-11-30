import { MouseEvent } from 'react';
import Content from '../Content';
import { callingList } from './friends.styled';

const CallingList = () => {
  const handleDragOver = (e: MouseEvent) => {
    // dragenter 이벤트와 동작이 겹칠수 있기 때문에 e.preventDefault() 로 제한하며 둘이 결합하여 사용함
    e.preventDefault();

    const target = e.target as HTMLElement;

    const draggingElement = document.querySelector('.dragging');
    draggingElement && target.appendChild(draggingElement);
  };

  return (
    <Content>
      <h2 className="srOnly">전화연결 목록</h2>
      <ul css={callingList} onDragOver={handleDragOver}></ul>
    </Content>
  );
};

export default CallingList;
