// Result getting one resource
export type GetOneResult<T> =
    | { success: true; data: T }
    | { success: false; data: null; error: string };

// Result getting many resources
export type GetManyResult<T> =
    | { success: true; data: T[] }
    | { success: false; data: null; error: string };

// Result mutating (creating/updating) a resource
export type MutateResult<T> =
    | { success: true; data: T; message: string }
    | { success: false; data: null; message: string };

// Result deleting a resource
export type DeleteResult =
    | { success: true }
    | { success: false; error: string };
