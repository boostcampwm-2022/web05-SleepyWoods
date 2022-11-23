import { MouseEvent, useState } from 'react';
import Content from '../Content';
import { deviceComponentType } from './setting';
import { dropDown, selectedType } from './setting.styled';

const Device = ({ kind, device }: deviceComponentType) => {
  const [selected, setSelcted] = useState(device[0]);

  const toggleDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dropdown = target.nextSibling as HTMLElement;

    dropdown.classList.toggle('hidden');
  };

  const selectOption = (e: MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    if (!target.id) return;

    const data = device.filter(item => item.deviceId === target.id);
    data && setSelcted(data[0]);

    currentTarget.classList.toggle('hidden');
  };

  return (
    <Content>
      <h3>{kind} 설정</h3>
      <div css={selectedType} onClick={toggleDropdown}>
        {selected.label}
      </div>
      <ul css={dropDown} className="hidden" onClick={selectOption}>
        {device.map(({ deviceId, label }) => (
          <Content key={deviceId}>
            <div id={deviceId}>{label}</div>
          </Content>
        ))}
      </ul>
    </Content>
  );
};

export default Device;
