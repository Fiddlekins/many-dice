import getOutcomeCountsFromSample from './getOutcomeCountsFromSample.js';

export default function getValueFromSample(outcomeTable, eventCount, randomSample) {
	const outcomeCounts = getOutcomeCountsFromSample(outcomeTable, eventCount, randomSample);

	return outcomeCounts.map((outcomeCount, outcomeIndex) => {
		return outcomeCount * outcomeTable[outcomeIndex].value;
	}).reduce((acc, curr) => {
		return acc + curr;
	}, 0);
}
