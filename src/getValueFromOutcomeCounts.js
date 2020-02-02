export default function getValueFromOutcomeCounts(outcomeTable, outcomeCounts) {
	return outcomeCounts.map((outcomeCount, outcomeIndex) => {
		return outcomeCount * outcomeTable[outcomeIndex].value;
	}).reduce((acc, curr) => {
		return acc + curr;
	}, 0);
}
