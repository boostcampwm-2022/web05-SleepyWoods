import { MouseEventHandler } from 'react';
import { toggleSwitch, toggleBody, toggleWrapper } from './setting.styled';

type toggleType = {
  feature: string;
  status: boolean;
  handleClick: MouseEventHandler;
};

const Toggle = ({ feature, status, handleClick }: toggleType) => {
  return (
    <section css={toggleWrapper}>
      <h3>{feature}</h3>
      <div onClick={handleClick}>
        <div css={toggleSwitch(status)}>{status ? 'on' : 'off'}</div>
        <div css={toggleBody}></div>
      </div>
    </section>
  );
};

export default Toggle;
