
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img 
          src="https://images.unsplash.com/photo-1618247341398-a2b63558652d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          alt="A caring healthcare professional with a patient"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
