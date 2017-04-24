// was having weird issues with promise chain, so disabled this rule.
/* eslint-disable comma-dangle */
const Promise = require('bluebird')

function checkLength(inputNotesArray) {
	return new Promise((resolve, reject) => {
		const maxArrayLength = 11
		if (inputNotesArray.length > maxArrayLength) return reject(`array too long, max length ${maxArrayLength}`)
		if (inputNotesArray.length < 1) return reject('array does not contain anything')
		return resolve(inputNotesArray)
	})
}

function checkForNonIntegerTypes(inputNotesArray) {
	return new Promise((resolve, reject) => {
		if (Array.isArray(inputNotesArray) === false) reject('input is not an array type. requires array of numbers.')
		for (let i = inputNotesArray.length - 1; i >= 0; i -= 1) {
			if (isNaN(inputNotesArray[i])) return reject('array contains types other than integers')
		}
		return resolve(inputNotesArray)
	})
}

function checkForUniqueNumbers(inputNotesArray) {
	return new Promise((resolve, reject) => {
		const uniqueNumbers = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
		inputNotesArray.map(number => (uniqueNumbers[number] += 1))
		inputNotesArray.map((number) => {
			if (uniqueNumbers[number] > 1) return reject('array contains non-unique numbers')
			return resolve(inputNotesArray)
		})
	})
}

// Input up to 11 unique digits between 0 and 11 in the format of a numerically sorted list
function checkInputs(inputNotesArray) {
	return new Promise((resolve, reject) => checkForNonIntegerTypes(inputNotesArray)
		.then(checkLength)
		.then(checkForUniqueNumbers)
		.then(resolve)
		.catch(reject)
	)
}

module.exports = { checkInputs }
