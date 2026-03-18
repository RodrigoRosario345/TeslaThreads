import { Button } from "@/components";
import Link from "next/link";

export function CartEmpty() {
    return (
        <div className="space-y-6 px-12">
            <p className="text-lg">Your cart is empty.</p>
            <div className="flex gap-4">
                <Link href="/">
                    <Button buttonStyle="primary">Continue Shopping</Button>
                </Link>
                <Link href="/">
                    <Button buttonStyle="borderDark">Sign In</Button>
                </Link>
            </div>
        </div>
    );
}
