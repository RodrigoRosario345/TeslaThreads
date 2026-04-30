import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SignInForm } from "../SignInForm/SignInForm";
import { Button } from "@/components/ui/Button/Button";

export function SignInContainer() {
    return (
        <section className="bg-white text-gray-500 w-full max-w-104 h-auto mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
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
                className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-md! text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
                <FcGoogle size={20} />
                Sign In with Google
            </Button>
            <div className="flex items-center gap-2 my-9">
                <div className="h-px w-full bg-gray-200" />
                <p className="text-center text-sm">
                    Or
                </p>
                <div className="h-px w-full bg-gray-200" />
            </div>
            <Link href="/">
                <Button
                    type="button"
                    buttonStyle="borderDark"
                    className="w-full rounded-md!"
                >
                    Continue as Guest
                </Button>
            </Link>
        </section>
    );
}
