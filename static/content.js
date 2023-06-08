/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
// Message to background script
/**
 * @param {{ response: any; }} message
 */

// const body = document.querySelector("body")
document.body.onload = function () {
	console.log('Look at that body!');
	var button = document.createElement('button');
	button.classList.add('munisButton');
	button.textContent = 'Munis Stats';
	document.body.appendChild(button);

  var mbutton = document.querySelector("body > button");
console.log(mbutton)

mbutton.addEventListener('click', () => {
  var panel = document.getElementById('myPanel');
  alert('button pushed!')
  panel.style.transform = 'translateX(100%)';
  panel.style.opacity = 0;
  panel.animate(
    {
      transform: 'translateX(0%)',
      opacity: 1
    },
    500
  );
});


};





function handleResponse(message) {
	// console.log(`Message from the background script: ${message.response}`)
	const recievedData = message.response;
	let finalData;
	finalData = recievedData;
	console.log(finalData);

	if (recievedData[0] !== null) {
		console.log(recievedData[0]);
		let accountField = document.querySelector('#Account > input');
		let cidField = document.querySelector('#CID > input');
		let minField = document.querySelector('#Min > input');
		let varField = document.querySelector('#Var > input');
		let meanField = document.querySelector('#Mean > input');
		let stdField = document.querySelector('#Std > input');
		let medianField = document.querySelector('#Median > input');
		let maxField = document.querySelector('#Max > input');
		let countField = document.querySelector('#Count > input');
		let serviceField = document.querySelector('#Service > input');
		let SPCheck = document.querySelector('#SPcheckbox');
		let DHCheck = document.querySelector('#DHcheckbox');
		let MRCheck = document.querySelector('#MRcheckbox');
		let HUCheck = document.querySelector('#HUcheckbox');
		let SpConText = document.querySelector('#checkboxText');

		if (accountField == null) {
			console.log('nothing to add');
		} else {
			let accountData = finalData[0];
			let cidData = finalData[1];
			let minData = finalData[5];
			let meanData = finalData[3];
			let medianData = finalData[4];
			let maxData = finalData[2];
			let stdData = finalData[6];
			let varData = finalData[8];
			let countData = finalData[9];
			let servicedata = finalData[7];
			let HURR = finalData[12];
			let MCon = finalData[10];
			let SPCon = finalData[11];

			// @ts-ignore
			accountField.value = accountData;
			// @ts-ignore
			cidField.value = cidData;
			// @ts-ignore
			minField.value = minData;
			// @ts-ignore
			meanField.value = meanData;
			// @ts-ignore
			medianField.value = medianData;
			// @ts-ignore
			maxField.value = maxData;
			// @ts-ignore
			stdField.value = stdData;
			// @ts-ignore
			varField.value = varData;
			// @ts-ignore
			countField.value = countData;
			// @ts-ignore
			serviceField.value = servicedata;
			// @ts-ignore
			console.log(accountField.value);

			if (MCon !== 'E' || 'R') {
				console.log('No Meter Condition Found');
				// @ts-ignore
				MRCheck.classList.remove('checkbox-mark');
				// @ts-ignore
				DHCheck.classList.remove('checkbox-mark');
			}

			if (MCon == 'E') {
				// @ts-ignore
				DHCheck.classList.add('checkbox-mark');
				// @ts-ignore
				console.log('DH:', DHCheck.value);
			}

			if (MCon == 'R') {
				// @ts-ignore
				MRCheck.classList.add('checkbox-mark');
				// @ts-ignore
				console.log('MR:', MRCheck.value);
			}

			if (HURR !== ' ') {
				// @ts-ignore
				HUCheck.classList.add('checkbox-mark');
				// @ts-ignore
				console.log('HU:', HUCheck.value);
			}

			if (HURR == ' ') {
				// @ts-ignore
				HUCheck.classList.remove('checkbox-mark');
			}

			if (SPCon !== ' ') {
				// @ts-ignore
				SPCheck.classList.add('checkbox-mark');
				// @ts-ignore
				SpConText.value = SPCon;
				console.log('SPcon text:', SPCon.value);
			}

			if (SPCon == ' ') {
				// @ts-ignore
				SPCheck.classList.remove('checkbox-mark');
				// @ts-ignore
				SpConText.value = ' ';
			}

			const actualUsage = document.querySelectorAll('input')[31].value;
			// @ts-ignore
			const testValue3 = meanData + stdField.value * 3;
			// @ts-ignore
			const testValue2 = meanData + stdField.value * 2;
			console.log(actualUsage, testValue2, testValue3);
			var notLight = document.getElementsByClassName('notification-light');
			if (testValue2 < actualUsage < testValue3) {
				// @ts-ignore
				notLight[0].style.animation = 'blinkyellow 1s infinite';
			}
			if (actualUsage > testValue3) {
				// @ts-ignore
				notLight[0].style.animation = 'blinkRed 1s infinite';
			}
			if (actualUsage < testValue2) {
				// @ts-ignore
				notLight[0].style.animation = 'blinkGreen 0.5s infinite';
			}
		}
	}
}

// @ts-ignore
function handleError(error) {
	console.log(`Error: ${error}`);
}

// could be #w_123 or #w_659
// @ts-ignore
function notifyBackgroundPage() {
	if (document.querySelectorAll('input')[1].value == null) {
		console.log('Empty Field');
	}
	if (document.querySelectorAll('input')[1].value !== null) {
		let accNo = document.querySelectorAll('input')[1].value;
		let cidNo = document.querySelectorAll('input')[2].value;
		let serCo = document.querySelectorAll('input')[4].value;
		const accDetails = [accNo, cidNo, serCo];
		console.log(accDetails);
		// @ts-ignore
		const send = chrome.runtime.sendMessage({ greeting: accDetails });
		send.then(handleResponse, handleError);
	}
}

document.addEventListener('click', initNotify);

function initNotify() {
	setTimeout(function () {
		notifyBackgroundPage();
	}, 350);
}
