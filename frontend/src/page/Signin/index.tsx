import Background from '../../component/Background';
import Modal from '../../component/Modal';
import SigninContent from '../../component/SigninContent';

const Signin = () => {
  return (
    <Background>
      <Modal>
        <SigninContent />
      </Modal>
    </Background>
  );
};

export default Signin;
