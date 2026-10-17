import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
      <Link
  to="/forgot-password"
  className="text-sm text-brand-500 hover:text-brand-600"
>
  Forgot password?
</Link>
<Link
  to="/signup"
  className="text-brand-500 hover:text-brand-600"
>
  Sign up
</Link>
    </>
  );
}
