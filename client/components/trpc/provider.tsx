"use client"

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from '@/server/client'
import superjson, { SuperJSON } from "superjson"
import { httpBatchLink } from '@trpc/client'

const TRPCProvider = ({children}: {children: React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() => {
        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc"
                })
            ]
            
        })
    })
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default TRPCProvider