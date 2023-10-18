import React from 'react';
import GuardedPage from '@/components/subpages/GuardedPage';
import Login from '@/components/subpages/Login';

export default function Index() {
  return (
    <GuardedPage inverted={true} destination="patient-portal">
      <Login />
    </GuardedPage>
  );
}
