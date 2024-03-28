import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
      user && (
          <div>
            {user.picture && user.name && <img src={user.picture} alt={user.name} />}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.nickname}</p>
            <p>{user.sub}</p>
            <p>{user.updated_at}</p>
            <p>{user.org_id}</p>
            <p>{user.email_verified}</p>
          </div>
      )
  );
}