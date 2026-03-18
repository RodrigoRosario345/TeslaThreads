import { Button } from "@/components";
import Link from "next/link";

export function CartEmpty() {
    return (
        <div className="space-y-6 sm:px-12 mt-30 md:mt-12">
            <p className="text-xl text-center md:text-left text-gray-600">Your cart is empty.</p>
            <div className="flex flex-wrap gap-4">
                <Link href="/" className="w-60 grow md:max-w-80">
                    <Button buttonStyle="primary" className="w-full px-0!">Continue Shopping</Button>
                </Link>
                <Link href="/" className="w-60 grow md:max-w-80">
                    <Button buttonStyle="borderDark" className="w-full px-0!">Sign In</Button>
                </Link>
            </div>
        </div>
    );
}