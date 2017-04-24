/* global describe, it, expect */

const chord = require('../chord.js')

const inputNumbers = [0, 4, 7]

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
	})
	// Add value of N to each number. First time add 0. Runs 12 times, each time adding one more.
	// Numbers should only be between 0-11.

	// The computer finds (0+N, 4+N, 7+N) in the table below and outputs corresponding
	// list of numbers.

	// When N=0, Outputs: 480 600 720

	// Find greatest common denominator and divide each of the indexed numbers by it.
	// When N=0, GCD(480 600 720)=120, Outputs: 4 5 6

	// Find the least common multiple (LCM) of the new set of numbers.
	// When N=0, LCM(4,5,6)=60, Outputs: 60

	// Store number. Repeat above process with N=1, N=2,... until N=11, storing all numbers.
	// Compare all 12 numbers, outputting the smallest value of N.

	// If multiple N values share the minimum value, output all of them in a list.
})
