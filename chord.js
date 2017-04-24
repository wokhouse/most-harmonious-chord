// was having weird issues with promise chain, so disabled this rule.
/* eslint-disable comma-dangle */
const Promise = require('bluebird')
const math = require('mathjs')

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

function checkForTooBigInts(inputNotesArray) {
	return new Promise((resolve, reject) => {
		inputNotesArray.map((inputNote) => {
			if (inputNote > 11) return reject('array contains intger above 11')
			return {}
		})
		return resolve(inputNotesArray)
	})
}

// Input up to 11 unique digits between 0 and 11 in the format of a numerically sorted list
function checkInputs(inputNotesArray) {
	return new Promise((resolve, reject) => checkForNonIntegerTypes(inputNotesArray)
		.then(checkLength)
		.then(checkForUniqueNumbers)
		.then(checkForTooBigInts)
		.then(resolve)
		.catch(reject)
	)
}

function addN(inputNotesArray, n) {
	return new Promise((resolve) => {
		const addedArray = inputNotesArray.map(inputNote => (inputNote + n))
		resolve(addedArray)
	})
}

const notesToFreq = {
	0: 480,
	1: 512,
	2: 540,
	3: 576,
	4: 600,
	5: 640,
	6: 675,
	7: 720,
	8: 768,
	9: 800,
	10: 864,
	11: 900,
	12: 960,
	13: 1024,
	14: 1080,
	15: 1152,
	16: 2280,
	17: 1280,
	18: 1350,
	19: 1440,
	20: 1536,
	21: 1600,
	22: 1728,
	23: 1800,
}

function getFreqs(inputNotesArray) {
	return new Promise((resolve) => {
		const freqsArray = inputNotesArray.map(inputNote => notesToFreq[inputNote])
		resolve(freqsArray)
	})
}

function makeMaths(freqsArray) {
	return new Promise((resolve) => {
		const gcd = math.gcd(...freqsArray)
		const freqsDividedByGCD = freqsArray.map(freq => freq / gcd)
		const lcd = math.lcm(...freqsDividedByGCD)
		resolve(lcd)
	})
}

function performCalulationsOnAGivenN(inputNotesArray, n) {
	return new Promise((resolve, reject) => {
		addN(inputNotesArray, n)
		.then(getFreqs)
		.then(makeMaths)
		.then(resolve)
		.catch(reject)
	})
}

function findSmallestLCMs(inputNotesArray) {
	return new Promise((resolve) => {
		let lcms = []
		const timesToRecurse = 12
		let n = 0
		function recursivelyCalculateNs() {
			if (n < timesToRecurse) {
				performCalulationsOnAGivenN(inputNotesArray, n)
				.then((lcm) => {
					lcms.push({ position: n, value: lcm })
				})
				n += 1
				return setImmediate(recursivelyCalculateNs)
			}

			let lowestLCM
			lcms.map((lcm) => {
				if (lowestLCM === undefined) return lowestLCM = lcm.value
				else if (lcm.value < lowestLCM) return lowestLCM = lcm.value
				return null
			})
			let lowestLCMs = []
			lcms.map((lcm) => {
				if (lcm.value <= lowestLCM) return lowestLCMs.push(lcm)
				return null
			})
			return resolve(lowestLCMs)
		}
		recursivelyCalculateNs()
	})
}

module.exports = { checkInputs, addN, getFreqs, makeMaths, findSmallestLCMs }
