"use client";

import Loading from "@/components/auth/loading";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading,
   Authenticated,
    ConvexReactClient, 
    Unauthenticated} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import AuthenticatedContent from "./auth-provider";
import { StrictMode } from "react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

// Environment variables for security
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <StrictMode>
      <ClerkProvider dynamic publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {/* <Unauthenticated>  */}
            {children}
          {/* </Unauthenticated> */}
          <AuthLoading>
            <Loading />
          </AuthLoading>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </StrictMode>
  );
};
