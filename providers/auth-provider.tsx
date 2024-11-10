// "use client";

// import { useAuth } from "@clerk/nextjs";
// import { Authenticated } from "convex/react";

// const AuthenticatedContent = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <Authenticated>
//       {children}
//     </Authenticated>
//   );
// };

// export default AuthenticatedContent;
"use client";

import { useAuth } from "@clerk/nextjs";
import { Authenticated } from "convex/react";

const AuthenticatedContent = ({ children }: { children: React.ReactNode }) => {
  console.log("AuthenticatedContent rendered");

  return (
    <Authenticated>
      {children}
    </Authenticated>
  );
};

export default AuthenticatedContent;
