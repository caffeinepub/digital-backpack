import React from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import { useInitializeBackpack } from './hooks/useQueries';
import LoginButton from './components/auth/LoginButton';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import BackpackPage from './features/backpack/BackpackPage';
import { Loader2 } from 'lucide-react';

export default function App() {
  const { identity, isInitializing: authInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const { mutate: initBackpack, isPending: initializingBackpack } = useInitializeBackpack();

  // Initialize backpack when user logs in and has a profile
  const hasProfile = userProfile !== null && userProfile !== undefined;

  // Show profile setup when authenticated, profile is fetched, and no profile exists
  const showProfileSetup = isAuthenticated && profileFetched && !profileLoading && userProfile === null;

  // Show backpack when authenticated and has profile
  const showBackpack = isAuthenticated && hasProfile;

  // Initialize backpack automatically when conditions are met
  React.useEffect(() => {
    if (showBackpack && !initializingBackpack) {
      initBackpack();
    }
  }, [showBackpack, initBackpack, initializingBackpack]);

  if (authInitializing || (isAuthenticated && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] bg-repeat"
          style={{ backgroundImage: 'url(/assets/generated/backpack-pattern.dim_1600x900.png)' }}
        />
        <div className="relative z-10 text-center space-y-8 max-w-md px-6">
          <img 
            src="/assets/generated/backpack-logo.dim_512x512.png" 
            alt="Digital Backpack" 
            className="w-32 h-32 mx-auto"
          />
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">Digital Backpack</h1>
            <p className="text-lg text-muted-foreground">
              Organize and manage your items like packing for an adventure
            </p>
          </div>
          <div className="pt-4">
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  if (showProfileSetup) {
    return <ProfileSetupDialog />;
  }

  if (showBackpack) {
    return <BackpackPage />;
  }

  return null;
}
