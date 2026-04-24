import Link from "next/link";
import { Button } from "@/components";
import { FcGoogle } from "react-icons/fc";

export function SignUpForm() {
    return (
        <section className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Sign Up
            </h2>
            <form>
                <input
                    id="email"
                    className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
                <input
                    id="password"
                    className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                    type="password"
                    placeholder="Enter your password"
                    required
                />
                <Button
                    type="submit"
                    buttonStyle="primary"
                    className="w-full mt-3 mb-3 rounded-full"
                >
                    Sign Up
                </Button>
            </form>
            <p className="text-center mt-4">
                Already have an account?{" "}
                <Link href="/auth/sign-in" className="text-blue-500 hover:underline hover:underline-offset-4 hover:text-blue-700">
                    Sign In
                </Link>
            </p>
            <Button
                type="button"
                className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
            >
                <FcGoogle size={20} />
                Sign Up with Google
            </Button>
        </section>
    );
}
