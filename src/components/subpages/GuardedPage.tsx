import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSigninCheck } from 'reactfire';

export function Loading(): JSX.Element {
  return (
    <div className="splash-screen">
      Loading.
      <div className="loading-dot">.</div>
    </div>
  );
}

export default function GuardedPage({
  children,
  inverted,
  destination
}: {
  children: JSX.Element;
  inverted: boolean;
  destination: string;
}): JSX.Element {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();

  useEffect(() => {
    if (status === 'success' && !inverted !== signInCheckResult.signedIn) {
      router.push(destination);
    }
  }, [router, status, signInCheckResult, destination, inverted]);

  if (status === 'loading') {
    return <Loading />;
  } else if (!inverted === signInCheckResult.signedIn) {
    return children;
  } else {
    return <Loading />;
  }
}
