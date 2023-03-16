import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const DashboardPage: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return <div>{user['name']}, welcome to Smart management</div>;
};

export { DashboardPage };
