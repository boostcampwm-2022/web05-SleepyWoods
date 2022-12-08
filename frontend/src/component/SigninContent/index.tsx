import { SignButton } from '../Button';
import { buttons } from '../Button/button.styled';
import { imgWrapper, container, content, title } from './signinContent.styled';
import preview from '../../assets/preview.gif';

const SigninContent = () => {
  return (
    <section css={container}>
      <h1 css={title}>Sign In</h1>
      <div css={content}>
        <section css={imgWrapper}>
          <img src={preview} />
        </section>
        <section css={buttons}>
          <SignButton type={'naver'} />
          <SignButton type={'kakao'} />
          <SignButton type={'google'} />
        </section>
      </div>
    </section>
  );
};

export default SigninContent;
