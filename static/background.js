/* eslint-disable no-undef */
// @ts-nocheck

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase_key =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ra3p3b3lkYXBwcHB0amNqcXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNTM3MDIsImV4cCI6MTk5ODYyOTcwMn0.hm94JMq-eHUA4cvvucxx1P5e_IV84ZJuQHNsyZK4re8';
const supabase_url = 'https://nkkzwoydapppptjcjqsm.supabase.co';
const options = {
	db: {
		schema: 'public'
	},
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	},
	global: {
		headers: { 'x-my-custom-header': 'my-app-name' },
		fetch: fetch.bind(globalThis)
	}
};

let supabase = createClient(supabase_url, supabase_key, options);

console.log('Supabase Instance: ', supabase);

async function getData(accountNumber, customerNumber, serviceCode) {
	let { data: Meters, error: error } = await supabase
		.from('Meters')
		.select('*')
		.limit(1)
		.eq('ACCOUNT_NO', accountNumber)
		.eq('CID_NO', customerNumber)
		.eq('Service_Type', serviceCode);

	// Issue Token
	if (error) {
		console.log('There was an Error:', error);
	}
	// Receive Token
	if (Meters) {
		console.log('Supabase Data Returned:', Meters);
	}
	return Meters;
}

function handleMessage(request, sender, sendResponse) {
	console.log(`A content script sent a message: ${request.greeting}`);
	const accountDetails = request.greeting;
	const accountNumber = accountDetails[0];
	const customerNumber = accountDetails[1];
	const serviceCode = accountDetails[2];
	console.log('Account#: ', accountNumber, 'CID#: ', customerNumber, 'Service#: ', serviceCode);

	getData(accountNumber, customerNumber, serviceCode)
		.then((Meters) => {
			const accData = Object.values(Meters[0]);
			console.log(accData[0]);
			const key = accData[0];
			const uuid = accData[1];
			const accNo = accData[2];
			const cidNo = accData[3];
			const acSer = accData[4];
			const meterNo = accData[5];
			const acOldDate = accData[6];
			const acNewDate = accData[7];
			const acAvg = accData[8];
			const acCnt = accData[9];
			const acMax = accData[10];
			const acMin = accData[11];
			const acMed = accData[12];
			const acVar = accData[13];
			const acStdDev = accData[14];
			const acCon = accData[15];
			const acHurr = accData[16];
			const acWo = accData[17];
			const acAss = accData[18];

			const accountData = [uuid, key, accNo, cidNo, acSer, meterNo, acOldDate, acNewDate, acAvg, acCnt, acMax, acMin, acMed, acVar, acStdDev, acCon, acHurr, acWo, acAss];
			console.log(accountData);
			sendResponse({ response: accountData });
		})
		.catch((error) => {
			console.log(error);
		});

	return true;
}

chrome.runtime.onMessage.addListener(handleMessage);
