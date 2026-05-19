'use client';

import { Button } from "@/components";
import { useCallbackUrl, useSessionUser } from "@/hooks";
import Link from "next/link";

export function CartEmpty() {
    const { isAuthenticated } = useSessionUser();
    const callbackUrl = useCallbackUrl();

    return (
        <div className="space-y-6 sm:px-12 mt-30 md:mt-12">
            <p className="text-lg text-center md:text-left text-gray-600">
                Your cart is empty.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link href="/" className="w-60 grow md:max-w-80">
                    <Button type="button" className="w-full px-0">
                        Continue Shopping
                    </Button>
                </Link>
                {!isAuthenticated && (
                    <Link href={`/auth/sign-in?callbackUrl=${callbackUrl}`} className="w-60 grow md:max-w-80">
                        <Button variant="borderDark" className="w-full px-0">
                            Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
