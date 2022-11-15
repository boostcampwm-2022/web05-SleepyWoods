import Background from '../../component/Background';
import Modal from '../../component/Modal';
import { header, avatars, nickname, signupBtn } from './signup.styled';

const Signup = () => {
  return (
    <Background>
      <Modal>
        <h2 css={header}>Setting</h2>
        <div css={avatars}>1</div>
        <input
          type="text"
          css={nickname}
          placeholder="설정할 닉네임을 입력하세요."
        />
        <button css={signupBtn}>Signup</button>
      </Modal>
    </Background>
  );
};

export default Signup;
