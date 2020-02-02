import getOutcomeCountsFromSample from './getOutcomeCountsFromSample.js';
import getValueFromOutcomeCounts from './getValueFromOutcomeCounts.js';

const inputOutcomeTable = document.getElementById('outcomeTable');
const inputEventCount = document.getElementById('eventCount');
const inputRandomSample = document.getElementById('randomSample');
const outputResult = document.getElementById('result');

const defaultOutcomeTable = [
	{ weighting: 4, value: 0 },
	{ weighting: 1, value: 1 },
	{ weighting: 1, value: 2 }
];
inputOutcomeTable.value = JSON.stringify(defaultOutcomeTable, null, 2);
const defaultEventCount = 5;
inputEventCount.value = defaultEventCount;
const defaultRandomSample = 0.5;
inputRandomSample.value = defaultRandomSample;


let currentOutcomeTable = defaultOutcomeTable;
let currentEventCount = defaultEventCount;
let currentRandomSample = defaultRandomSample;

function updateResult() {
	// 1 is actually invalid, so clamp it to the closest number instead
	const clampedRandomSample = currentRandomSample === 1 ? (Number.MAX_SAFE_INTEGER - 1) / Number.MAX_SAFE_INTEGER : currentRandomSample;
	const outcomeCounts = getOutcomeCountsFromSample(currentOutcomeTable, currentEventCount, clampedRandomSample);
	const value = getValueFromOutcomeCounts(currentOutcomeTable, outcomeCounts);
	const result = `Outcome counts: ${JSON.stringify(outcomeCounts)}
Value: ${value}`;
	outputResult.innerHTML = result.replace('\n', '<br>');
}

function autoScaleInputOutcomeTable() {
	if (inputOutcomeTable.clientHeight < inputOutcomeTable.scrollHeight) {
		inputOutcomeTable.style.height = inputOutcomeTable.scrollHeight + "px";
	}
}

autoScaleInputOutcomeTable();
updateResult();

inputOutcomeTable.addEventListener('input', function () {
	autoScaleInputOutcomeTable();
	try {
		currentOutcomeTable = JSON.parse(inputOutcomeTable.value);
	} catch (e) {
		outputResult.innerHTML = 'Outcome table is invalid JSON';
		return;
	}
	if (currentOutcomeTable.some((outcome) => {
		return outcome.weighting === undefined || outcome.value === undefined;
	})) {
		outputResult.innerHTML = 'Outcome table is missing required properties';
		return;
	}
	updateResult();
});

inputEventCount.addEventListener('input', function () {
	currentEventCount = parseInt(inputEventCount.value, 10);
	updateResult();
});

inputRandomSample.addEventListener('input', function () {
	currentRandomSample = parseFloat(inputRandomSample.value);
	updateResult();
});