import Game from '../../component/Game';
import Sidebar from '../../component/Sidebar';
import SleepyBoard from '../../component/SleepyBoard';
import Snow from '../../component/Snow';

const Town = () => {
  return (
    <>
      <Sidebar />
      <Game />
      <Snow />
      <SleepyBoard />
    </>
  );
};

export default Town;
