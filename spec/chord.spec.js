/* global describe, it, expect */

// require unit to spec
const chord = require('../chord.js')

// example input
const inputNumbers = [2, 3, 7, 10]
const exampleFreqs = [540, 576, 720, 864]
// created seperate array because this would have resulted in a gcd of 1 and
// I wanted a more complex gcd to check the maths
const easierExampleNumbers = [1, 2, 6, 9]

describe('chord finder', () => {
	describe('input verification', () => {
		// Input up to 11 unique digits between 0 and 11 in the format of a numerically sorted list
		it('should take up to 11 digits, all unique, each between 0 and 11 as an array', (done) => {
			chord.checkInputs(inputNumbers).then(done).catch(done.fail)
		})
		it('should not take more than 11 digits', (done) => {
			const tooLongArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			chord.checkInputs(tooLongArray).then(done.fail).catch((err) => {
				expect(err).toEqual('array too long, max length 11')
				done()
			})
		})
		it('should not take less than 1 digits', (done) => {
			const tooShortArray = []
			chord.checkInputs(tooShortArray).then(done.fail).catch((err) => {
				expect(err).toEqual('array does not contain anything')
				done()
			})
		})
		it('should reject lists with non-unique numbers', (done) => {
			const arrayWithNonUniqueNumbers = [1, 2, 3, 4, 1]
			chord.checkInputs(arrayWithNonUniqueNumbers).then(done.fail).catch((err) => {
				expect(err).toEqual('array contains non-unique numbers')
				done()
			})
		})
		it('should reject arrays that do not contain numbers', (done) => {
			const arrayWithNonUniqueNumbers = [1, 'a', 3, 4, 1]
			chord.checkInputs(arrayWithNonUniqueNumbers).then(done.fail).catch((err) => {
				expect(err).toEqual('array contains types other than integers')
				done()
			})
		})
		it('should reject objects', (done) => {
			const objectType = { check: 'mate' }
			chord.checkInputs(objectType).then(done.fail).catch((err) => {
				expect(err).toEqual('input is not an array type. requires array of numbers.')
				done()
			})
		})
		it('should reject strings', (done) => {
			const stringType = 'hey mate what\'s good'
			chord.checkInputs(stringType).then(done.fail).catch((err) => {
				expect(err).toEqual('input is not an array type. requires array of numbers.')
				done()
			})
		})
		it('should reject integers', (done) => {
			const integerType = 56455678876
			chord.checkInputs(integerType).then(done.fail).catch((err) => {
				expect(err).toEqual('input is not an array type. requires array of numbers.')
				done()
			})
		})
		it('should reject array that contains integers above 11', (done) => {
			const arrayWithTooLargeInteger = [1, 2, 420]
			chord.checkInputs(arrayWithTooLargeInteger).then(done.fail).catch((err) => {
				expect(err).toEqual('array contains intger above 11')
				done()
			})
		})
	})
	// Add value of N to each number. First time add 0. Runs 12 times, each time adding one more.
	// Numbers should only be between 0-11.
	describe('add N', () => {
		it('should add N to each number given numbers and N', (done) => {
			chord.addN(inputNumbers, 1)
			.then((addedArray) => {
				expect(addedArray).toEqual([3, 4, 8, 11])
				done()
			})
		})
	})
	// The computer finds (0+N, 4+N, 7+N) in the table below and outputs corresponding
	// list of numbers.
	describe('given a set of numbers, grab frequency and return array with freqs', () => {
		it('given a set of numbers, grab frequency and return array with freqs', (done) => {
			chord.getFreqs(inputNumbers)
			.then((arrayOfFreqs) => {
				expect(arrayOfFreqs).toEqual([540, 576, 720, 864])
				done()
			})
		})
	})
	// Find greatest common denominator and divide each of the indexed numbers by it.
	// When N=0, GCD(480 600 720)=120, Outputs: 4 5 6
	// Find the least common multiple (LCM) of the new set of numbers.
	// When N=0, LCM(4,5,6)=60, Outputs: 60
	describe('math funcs', () => {
		it('should divide by gdc of freqs and output lcm', (done) => {
			chord.makeMaths(exampleFreqs)
			.then((lcm) => {
				expect(lcm).toEqual(240)
				done()
			})
		})
	})

	// Store number. Repeat above process with N=1, N=2,... until N=11, storing all numbers.
	// Compare all 12 numbers, outputting the smallest value of N.
	// If multiple N values share the minimum value, output all of them in a list.
	describe('do it twelve times and output an array with the iteration position of the smallest lcm', () => {
		it('should output array of smallest lcms', (done) => {
			chord.findSmallestLCMs(easierExampleNumbers)
			.then((smallestNs) => {
				expect(smallestNs).toEqual([2, 4, 6, 7, 12])
				done()
			})
		})
	})
})
