export function buildRange(start: number, end: number, step = 1): number[] {
    if (Math.abs(step) < 0.00001) {
        return [];
    }

    if (start < end) {
        if (step > 0) {
            const result = [];

            for (let n = start; n <= end; n += step) {
                result.push(n);
            }

            return result;
        }

        return [];
    }

    if (start > end) {
        if (step < 0) {
            const result = [];

            for (let n = start; n >= end; n += step) {
                result.push(n);
            }

            return result;
        }

        return [];
    }

    return [];
}