import request from 'superagent';

// require the user to call the init function, and pass in an email. That way, different sites can send to different emails.
window.initErrorLogger = function ErrorLogger(recipientEmailAddress){
// actual email function
  const url = 'http://emailservice-memsearch.rhcloud.com/email';
  const browserData = {
    browser:window.navigator.userAgent,
    url:window.location.href,
    host: window.location.hostname,
    cameFrom: document.referrer
  }
  return function sendItAway(errorText){
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
        alert('An error occured. An error report was submitted to the developer.')
      })
      .catch(function(err){
        alert(`An error occured, but we weren\'t able to send it to the dev team. Please email ${recipientEmailAddress}, and let them know an error occured`) //TODO: add error message to this
      });

  }


// capture window errors
// callable function for users to initiate their own error reporting

// return important pieces into the window

}
