import factorial from './factorial.js';

export default function getOutcomeCountsFromSample(outcomeTable, eventCount, randomSample) {
	const outcomeCounts = [];
	let remainingEvents = eventCount;

	for (let outcomeIndex = 0; outcomeIndex < outcomeTable.length; outcomeIndex++) {
		const outcome = outcomeTable[outcomeIndex];
		const totalWeighting = outcomeTable.slice(outcomeIndex).reduce((acc, curr) => {
			return acc + curr.weighting;
		}, 0);
		const outcomeProbability = outcome.weighting / totalWeighting;

		let cumulativeProbabilityOutcomeCount = 0;
		for (let outcomeCount = 0; outcomeCount <= remainingEvents; outcomeCount++) {
			const probabilityOutcomeCount = (outcomeProbability ** outcomeCount)
				* ((1 - outcomeProbability) ** (remainingEvents - outcomeCount))
				* (factorial(remainingEvents) / (factorial(outcomeCount) * factorial(remainingEvents - outcomeCount)));
			cumulativeProbabilityOutcomeCount += probabilityOutcomeCount;
			if (randomSample < cumulativeProbabilityOutcomeCount) {
				outcomeCounts[outcomeIndex] = outcomeCount;
				remainingEvents -= outcomeCount;
				randomSample /= cumulativeProbabilityOutcomeCount;
				break;
			} else if (outcomeCount === remainingEvents) {
				// JS floats aren't perfect so we sometimes miss the condition at the end, eg. 0.9... < 0.9... is false
				// Thus if we're on the final iteration and haven't set an outcomeCount do it for max outcomeCount and cumulativeProbabilityOutcomeCount=1
				outcomeCounts[outcomeIndex] = outcomeCount;
				remainingEvents -= outcomeCount;
			}
		}

	}
	return outcomeCounts;
}