import request from 'superagent';

// require the user to call the init function, and pass in an email. That way, different sites can send to different emails.

window.Muninn = function ErrorLogger(recipientEmailAddress){
// actual email function
  const url = 'http://emailservice-memsearch.rhcloud.com/email';
  const browserData = {
    browser:window.navigator.userAgent,
    url:window.location.href,
    host: window.location.hostname,
    cameFrom: document.referrer
  }
  function sendItAway(errorText){
      //function sends the error
      let formattedErrorText = `Here's the error details:\n
      browser: ${browserData.browser} \n
      full url: ${browserData.url} \n
      came here from ${browserData.cameFrom} \n
      date/time: ${new Date(Date.now()).toLocaleString()} \n
      error: ${errorText}
      `
      let data = {
        'sendTo':recipientEmailAddress,
        'subject':`This is an error message from ${browserData.host}`,
        'text':formattedErrorText,
      }
      function requestWrapper(callback){
        return request
        .post(url)
        .send(data)
        .end(callback)
      }

      let sent = new Promise(function (resolve, reject){
        requestWrapper(function(err, res){
          if (err || !res.ok) {
            reject((err || !res.ok));
          } else {
            resolve(res);
          }
        });
      })

      sent
      .then(function(){
        console.log(`an error occurred, and a report was sent to the dev team.`)
      })
      .catch(function(err){
        console.log(`An error occured, but we weren\'t able to send it to the dev team. Please email ${recipientEmailAddress}, and let them know the following error occured: \n
        ${err}
        `)
      });

  }


// capture window errors
window.onerror = function(errorMsg, url, lineNo, columnNo, errorObj) {
  console.log('calling error')
  let message = 'Here\'s the error message:\n';
  if(url) message+= `The error occured in ${url} \n`
  if(lineNo) message+= `It occured on line ${lineNo} \n`
  if(columnNo) message+= `It occured in col ${columnNo} \n`
  message+= `${errorMsg} \n`;
  message+= `Stack Trace: ${errorObj.stack}`;

  sendItAway(message);
};
// TODO: catch resource errors
// return important pieces into the window
// wrap emaail function so its not exposed to the window
function userManualLogger(text){
  sendItAway(text)
}
return userManualLogger;
}
