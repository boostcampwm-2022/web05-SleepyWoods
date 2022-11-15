import { SignButton } from '../Button';
import { buttons } from '../Button/button.styled';
import { imgWrapper, container, content, title } from './signinContent.styled';

const SigninContent = () => {
  return (
    <section css={container}>
      <h1 css={title}>Sign In</h1>
      <div css={content}>
        <section css={imgWrapper}>
          <img src="src/assets/preview.gif" />
        </section>
        <section css={buttons}>
          <SignButton type={'naver'}>Naver로 로그인하기</SignButton>
          <SignButton type={'kakao'}>kakao로 로그인하기</SignButton>
        </section>
      </div>
    </section>
  );
};

export default SigninContent;
