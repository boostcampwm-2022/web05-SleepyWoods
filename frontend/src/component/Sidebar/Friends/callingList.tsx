import Content from '../Content';
import { callingList } from './friends.styled';

const CallingList = () => {
  return (
    <Content>
      <h2 className="srOnly">전화연결 목록</h2>
      <div css={callingList}></div>
    </Content>
  );
};

export default CallingList;
