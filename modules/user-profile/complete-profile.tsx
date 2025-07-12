"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, GraduationCap, CheckCircle } from "lucide-react";
import { profileSchema } from "./schemas";
import type { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const sectionOptions = [
  { value: "mathematique", label: "Mathématique" },
  { value: "sciences experimentales", label: "Sciences Expérimentales" },
  { value: "lettres", label: "Lettres" },
  { value: "economie gestion", label: "Économie et Gestion" },
  { value: "technique", label: "Technique" },
  { value: "informatique", label: "Informatique" },
];

export const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const router = useRouter();

  const updateProfile = useMutation(
    trpc.profile.updateProfile.mutationOptions({
      onSuccess: () => {},
      onError: (error) => {},
    })
  );

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      school: "",
      section:"",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {

    


    setIsLoading(true);
    setError("");
    try {
      await updateProfile.mutateAsync({
        ...data, 
        isCompleted: true,
      });

     await queryClient.invalidateQueries({
      queryKey: ['profile']
    });
    
    

      router.refresh();
    } catch (error) {
      console.error("Error completing profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="w-full space-y-4">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 tracking-tight">
            <strong>Profile Completion Required!</strong>
            Please complete your profile to access all features and get
            personalized learning recommendations. This will only take a few
            minutes.
          </AlertDescription>
        </Alert>

        <Card className="border-slate-200/60">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-2xl tracking-tight font-semibold text-indigo-950">
              Complete Your Profile
            </CardTitle>
            <p className="text-sm text-slate-600 tracking-tight">
              Help us personalize your learning experience by providing some
              basic information
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Academic Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="size-5 text-indigo-600" />
                    <h3 className="text-lg font-medium text-indigo-950">
                      Academic Information
                    </h3>
                  </div>

                 <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-primary tracking-tight">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Academic Section
                        </FormLabel>
                        <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined} // Convert null to undefined
                        >
                            <SelectTrigger className="border-slate-200 focus:border-indigo-300 focus:ring-indigo-200">
                              <SelectValue placeholder="Select your academic section" />
                            </SelectTrigger>
                          <SelectContent>
                            {sectionOptions.map((option) => (
                              <SelectItem
                              key={option.value}
                              value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                            </FormControl>
                        <FormDescription className="text-slate-500 tracking-tight text-xs font-semibold">
                          Choose the section that matches your current studies
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-200">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary  text-white py-3"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Completing Profile...
                      </div>
                    ) : (
                      <div className="flex tracking-tight items-center gap-2">
                        <CheckCircle className="size-4" />
                        Complete Profile & Continue
                      </div>
                    )}
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-center tracking-tight  text-xs font-semibold text-slate-600 pt-1">
                  <p>
                    Need help? Contact our support team at{" "}
                    <a
                      href="mailto:support@example.com"
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      support@example.com
                    </a>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
