import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SignInForm } from "../SignInForm/SignInForm";
import { Button } from "@/components/ui/Button/Button";

export function SignInContainer() {
    return (
        <section className="bg-white text-gray-500 w-full max-w-96 h-auto mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Sign In
            </h2>
            <SignInForm />
            <p className="text-center mt-4">
                Don’t have an account?{" "}
                <Link
                    href="/auth/sign-up"
                    className="text-blue-500 hover:underline hover:underline-offset-4 hover:text-blue-700"
                >
                    Sign Up
                </Link>
            </p>
            <Button
                type="button"
                className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
            >
                <FcGoogle size={20} />
                Sign In with Google
            </Button>
        </section>
    );
}
