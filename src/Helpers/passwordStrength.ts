/**
 * Named strength levels from weakest to strongest.
 * 0 = empty, 1 = too short / very weak, 5 = excellent
 */
export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Result returned by the strength calculator.
 */
export interface PasswordStrengthResult {
    /** Numeric level 0-5 */
    level: PasswordStrengthLevel;
    /** Human-readable label (Spanish) */
    label: string;
    /** Tailwind CSS background class for the strength bar fill */
    barColor: string;
    /** Tailwind CSS text class for the label */
    textColor: string;
    /** Width percentage for the bar (0-100) */
    percentage: number;
    /** Whether individual requirement checklist should be shown */
    showRequirements: boolean;
    /** Individual criterion checks */
    checks: PasswordChecks;
}

/**
 * Granular checks included so the UI can render a checklist.
 */
export interface PasswordChecks {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

// Configuration
/** Minimum length before a password is considered "valid" */
const MIN_LENGTH = 8;

/** Special characters regex */
const SPECIAL_CHARS = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'/`~]/;

// Strength lookup table
interface StrengthConfig {
    label: string;
    barColor: string;
    textColor: string;
}

const STRENGTH_TABLE: Record<PasswordStrengthLevel, StrengthConfig> = {
    0: { label: "Empty", barColor: "bg-gray-300", textColor: "text-gray-400" },
    1: { label: "Very weak", barColor: "bg-red-500", textColor: "text-red-500" },
    2: { label: "Weak", barColor: "bg-orange-500", textColor: "text-orange-500" },
    3: { label: "Fair", barColor: "bg-yellow-500", textColor: "text-yellow-600" },
    4: { label: "Strong", barColor: "bg-lime-500", textColor: "text-lime-600" },
    5: {
        label: "Very strong",
        barColor: "bg-green-500",
        textColor: "text-green-600",
    },
};

/**
 * Run every individual check against the current password value.
 */
export function runPasswordChecks(password: string): PasswordChecks {
    return {
        minLength: password.length >= MIN_LENGTH,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: SPECIAL_CHARS.test(password),
    };
}

/**
 * Calculate a 0-5 strength score based on entropy heuristics.
 *
 * Scoring rules:
 *  - 0 points if empty
 *  - +1 for reaching MIN_LENGTH
 *  - +1 for having both upper & lower
 *  - +1 for containing a digit
 *  - +1 for containing a special character
 *  - +1 for length >= 12
 */
function calculateScore(password: string): PasswordStrengthLevel {
    if (password.length === 0) return 0;

    const checks = runPasswordChecks(password);
    let score = 0;

    if (checks.minLength) score++;
    if (checks.hasUppercase && checks.hasLowercase) score++;
    if (checks.hasNumber) score++;
    if (checks.hasSpecialChar) score++;
    if (password.length >= 12) score++;

    // Clamp to 1-5 (at least 1 if something was typed)
    return Math.max(1, score) as PasswordStrengthLevel;
}

/**
 * Main public function: evaluates password strength and returns a complete
 * result object ready for UI consumption.
 */
export function calculatePasswordStrength(
    password: string,
): PasswordStrengthResult {
    const level = calculateScore(password);
    const config = STRENGTH_TABLE[level];
    const checks = runPasswordChecks(password);

    return {
        level,
        label: config.label,
        barColor: config.barColor,
        textColor: config.textColor,
        percentage: (level / 5) * 100,
        showRequirements: level < 4 && password.length > 0,
        checks,
    };
}
