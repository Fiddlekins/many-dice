/**
 * Handles mathematics factorial operation n! which evaluates to n * n-1 * ... * 1
 *
 * @param number
 * @returns {number}
 */
export default function factorial(number) {
	let result = 1;
	while (number > 1) {
		result *= number;
		number--;
	}
	return result;
}