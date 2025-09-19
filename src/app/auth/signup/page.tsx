"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LayoutDashboard,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: "Required FirstName" }),
    lastName: z.string().min(2, { message: "Required LastName" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(11, { message: "Invalid phone number" }).max(14),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "Agree to terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords don't match.",
    path: ["confirmPassword"],
  });

type registerFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = (data: registerFormData) => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side -Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className=" flex items-center justify-center lg:justify-start space-x-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">Zettabyte</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
            Join <span className=" text-primary">Our</span> Community
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Create your account to get started with Zettabyte Dashboard.
          </p>
        </motion.div>

        {/* Righ Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </CardTitle>
              <p className="text-gray-600">Register with your information</p>
            </CardHeader>

            <CardContent className=" space-y-6">
              <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-2"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className=" space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Ruhul"
                      className=" border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Amin"
                      className="border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-sm mt-1 text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm text-gray-700 font-medium"
                  >
                    Email Address
                  </label>
                  <div className=" relative">
                    <Mail className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ruhul@example.com"
                      className="pl-10 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm  text-red-500 mt-1">
                      {" "}
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    placeholder="01712345678"
                    className="border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm  text-red-500 mt-1">
                      {" "}
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* District */}
                {/* <div className=" space-y-2">
                  <label
                    htmlFor="district"
                    className="text-sm font-medium text-gray-700"
                  >
                    জেলা
                  </label>
                  <div className=" relative">
                    <MapPin className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="district"
                      placeholder="আপনার জেলার নাম"
                      className="pl-10 border-gray-300 focus:border-blue-500"
                      {...register("district")}
                    />
                  </div>
                  {errors.district && (
                    <p className="text-sm text-red-500 mt-1">
                      {" "}
                      {errors.district.message}
                    </p>
                  )}
                </div> */}

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className=" space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className=" relative">
                      <Lock className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your Password"
                        className=" pl-10 pr-10 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="size-5" />
                        ) : (
                          <EyeOff className="size-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className=" relative">
                      <Lock className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        className=" absolute right-3 top-1/2 transform  -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={() =>
                          setConfirmShowPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Eye className="size-5" />
                        ) : (
                          <EyeOff className="size-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center space-x-2">
                  <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="agreeToTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm text-gray-700"
                  >
                    I accept the
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-700 "
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-700 "
                    >
                      {" "}
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500 mt-1">
                      {" "}
                      {errors.agreeToTerms.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2">
                        Creating account...
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Signup
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
