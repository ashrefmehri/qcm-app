"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LogIn, Chrome } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Please enter a password" }),
})

export const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked")
  }

  const onSubmit =(values: z.infer<typeof formSchema>)=>{
       console.log(values);
       
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl tracking-tight text-primary">🎓 Welcome Back!</CardTitle>
        <CardDescription className="tracking-tight">
          Sign in to continue your progress, practice new quizzes, and climb the leaderboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-primary tracking-tight">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-primary tracking-tight">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full h-10" type="submit">
              <LogIn className="w-4 h-4 mr-2" />
              Start Learning Journey
            </Button>
          </form>
        </Form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full h-10 bg-transparent" onClick={handleGoogleLogin} type="button">
          <Chrome className="w-4 h-4 mr-2" />
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className="flex items-center tracking-tight justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/sign-up" className="hover:underline font-semibold text-primary">
            Sign up here
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
