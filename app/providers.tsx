"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import {
  createPagesBrowserClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Database } from "@/lib/database.types";

interface ProvidersProps {
  children: React.ReactNode;
  initialSession: Session | null; // `Session | null` でもOK
}

export default function Providers({
  children,
  initialSession,
}: ProvidersProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
}
