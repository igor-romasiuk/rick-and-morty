"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { LoginModal } from "@/components/auth/LoginModal"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white/95 dark:bg-black/60 border-2 border-gray-200 dark:border-green-500/30 rounded-lg p-6 md:p-8 shadow-lg backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-green-400 heading-sci-fi">Welcome to the Multiverse</h1>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginModal initialMode="login" hideToggle={true} />
            </TabsContent>

            <TabsContent value="register">
              <LoginModal initialMode="register" hideToggle={true} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

