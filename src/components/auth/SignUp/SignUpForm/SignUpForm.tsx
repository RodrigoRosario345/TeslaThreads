import { Button } from "@/components";

export function SignUpForm() {
    return (
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
    );
}
