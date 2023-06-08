/* eslint-disable no-undef */
// @ts-nocheck

try {
  
  console.log('trying');
  (async () => {
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ra3p3b3lkYXBwcHB0amNqcXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNTM3MDIsImV4cCI6MTk5ODYyOTcwMn0.hm94JMq-eHUA4cvvucxx1P5e_IV84ZJuQHNsyZK4re8";
    const SUPABASE_URL = "https://nkkzwoydapppptjcjqsm.supabase.co";

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log(supabase);

  async function getData(accountNumber, customerNumber, serviceCode) {
    let { data, error } = await supabase
    .from('Meters')
    .select('*')
      .limit(1) // limits called data to only one row/entry
      .eq("ACCOUNT_NO", accountNumber).eq("CID_NO", customerNumber).eq("Service_Code", serviceCode)
  
  
    // Issue Token
    if (error) {
      console.log("There was an Error:", error);
    }
    // Receive Token
    if (data) {
      console.log("Supabase Data Returned:", data);
    }
    return data
  };

  function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.greeting}`);
    const accountDetails = request.greeting
    const accountNumber = accountDetails[0]
    const customerNumber = accountDetails[1]
    const serviceCode = accountDetails[2]
    console.log(accountNumber, customerNumber, serviceCode)
  
    var accData = getData(accountNumber, customerNumber, serviceCode)
      if (accData !== null) {
       
        sendResponse({ response: 'This is a response' });
      }
      if (accData == null) {
        console.log("Account/Customer Number not found")
      }
    };
  
  chrome.runtime.onMessage.addListener(handleMessage);
  }
 )} catch(e) {
    console.log("error", e);
  };
