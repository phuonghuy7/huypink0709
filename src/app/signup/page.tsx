
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1618247341398-a2b63558652d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        alt="A caring healthcare professional with a patient"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Form Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {/* The form card */}
        <div className="w-full max-w-md rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
