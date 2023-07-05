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

	var mbutton = document.querySelector('body > button');
	console.log(mbutton);
	var panel = document.createElement('div');
	panel.innerHTML = `   <div class="closebtn">   
		<button class="closebtnstyle">
		</button>
		</div>
		<div class="titleSpan">
        <span>Usage Statistics</span>
      </div>
      <div class="Account-Data">
        <div class="AccountNo" id="Account">
          <label>Account #: </label>
          <input disabled />
        </div>
        <div class="CID" id="CID">
          <label>CID: </label>
          <input disabled />
        </div>
        <div class="meterNo" id="meterNo">
          <label>Meter #: </label>
          <input disabled />
        </div>
        <div class="serviceNo" id="Service">
          <label>Service: </label>
          <input disabled />
        </div>
      </div>
      <div class="Data">
        <div class="date" id="newDate">
          <label>Date: </label>
          <input disabled />
        </div>
        <table class="munisTable">
          <tbody>
            <tr>
              <td id="condition">
                Condition:
                <input disabled />
                <div class="notLight"></div>
              </td>
            </tr>
            <tr style="height: 1.5rem"></tr>
            <tr>
              <td id="Count">
                Count:
                <input disabled />
              </td>
            </tr>
            <tr>
              <td id="Mean">
                Mean:
                <input disabled />
              </td>
              <td id="Median">
                Median:
                <input disabled />
              </td>
            </tr>
            <tr>
              <td id="Min">
                Min Value:
                <input disabled />
              </td>
              <td id="Max">
                Max Value:
                <input disabled />
              </td>
            </tr>
            <tr>
              <td id="Var">
                Variance:
                <input disabled />
              </td>
              <td id="Std">
                Std Dev:
                <input disabled />
              </td>
            </tr>
            <tr style="height: 3rem"></tr>
            <tr>
              <td>
                <label class="chLabel"
                  >WO Printed
                  <input
                    style="width: 1rem; left: 1.5rem; position: absolute"
                    type="checkbox"
					disabled
                  />
                </label>
              </td>
              <td>
                <label>
                  <input disabled />         
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label class="chLabel">HURR Sent
                  <input
				  id="HUcheckbox"
                    style="width: 1rem; left: 1.5rem; position: absolute"
                    type="checkbox"
                  />
                </label>
              </td>
              <td>
                <label>
                  <input disabled />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="Text" id="Text">
          <label style="position:absolute;top:-2rem">Special Conditions/Comments:</label>
          <textarea style="width:100%"></textarea>
        </div>
      </div>`;
	panel.classList.add('munisPanel');
	document.body.appendChild(panel);
	panel.style.transform = 'translateX(150%)';
	panel.style.opacity = '0%';

	mbutton.addEventListener('click', () => {
		// console.log('button pushed!');

		panel.animate(
			{
				transform: 'translateX(0%)',
				opacity: '100%'
			},
			1000
		);
		panel.style.transform = 'translateX(0%)';
		panel.style.opacity = '100%';
	});

	var panelbutton = document.querySelector('body > div.munisPanel > div.closebtn');
	panelbutton.addEventListener('click', () => {
		panel.animate(
			{
				transform: 'translateX(150%)',
				opacity: '0%'
			},
			1000
		);
		panel.style.transform = 'translateX(150%)';
		panel.style.opacity = '0%';
		console.log('close button pushed', panel);
	});
};

function handleResponse(message) {
	//  console.log(`Message from the background script: ${message.response}`)
	const recievedData = message;
	let finalData;
	finalData = recievedData;

	if (recievedData !== null) {
		console.log(finalData);
		let accountField = document.querySelector('#Account > input');
		let cidField = document.querySelector('#CID > input');
		let minField = document.querySelector('#Min > input');
		let meterNoField = document.querySelector('#meterNo > input');
		let varField = document.querySelector('#Var > input');
		let meanField = document.querySelector('#Mean > input');
		let stdField = document.querySelector('#Std > input');
		let medianField = document.querySelector('#Median > input');
		let maxField = document.querySelector('#Max > input');
		let countField = document.querySelector('#Count > input');
		let serviceField = document.querySelector('#Service > input');
		let HUCheck = document.querySelector('#HUcheckbox');
		let acTextbox = document.querySelector('#Text');
		let newDateField = document.querySelector('#newDate > input');
		let conditionField = document.querySelector('#condition > input');

		if (accountField == null) {
			console.log('nothing to add');
		} else {
			let accountData = Object.values(finalData)[0][2];
			let cidData = Object.values(finalData)[0][3];
			let minData = Object.values(finalData)[0][11];
			let meanData = Object.values(finalData)[0][8];
			let medianData = Object.values(finalData)[0][12];
			let maxData = Object.values(finalData)[0][10];
			let stdData = Object.values(finalData)[0][14];
			let varData = Object.values(finalData)[0][13];
			let countData = Object.values(finalData)[0][9];
			let servicedata = Object.values(finalData)[0][4];
			let HURR = Object.values(finalData)[0][17];
			let MCon = Object.values(finalData)[0][15];
			let acText = Object.values(finalData)[0][19];
			let meterNoData = Object.values(finalData)[0][5];
			let newDateData = Object.values(finalData)[0][7];

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
			meterNoField.value = meterNoData;
			newDateField.value = newDateData;
			conditionField.value = MCon;
			acTextbox.value = acText;

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
	if (document.querySelectorAll('input')[1] == null) {
		console.log('Empty Field');
	}
	if (document.querySelectorAll('input')[1].value !== null) {
		let accNo = document.querySelectorAll('input')[18].value;
		let cidNo = document.querySelectorAll('input')[19].value;
		let serCo = document.querySelectorAll('input')[21].value;
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
