import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { data, error, mutate } = useSWR('https://jaehyeon.art/sleact/api/users', fetcher);
  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null).then(() => {
      mutate(false, false);
    });
  }, []);

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
