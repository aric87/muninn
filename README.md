# muninn
front end JS error logger
Use:
set the logger as the first script include, initiate it, passing in the email to send the errors to.

```
window.Muninn = Muninn('your email')
```

Then, any uncaught exceptions will be sent, with an error report.
You will also have a logger available to send your own errors:
```
Muninn('your error message');
```
To catch resource errors you need to add en event listener to the window error event, and make userCapture true.
Here's an example configuration, that should be the first thing in the HTML file:
```
<script src="build/index.min.js"></script> <!-- add Muninn -->
<script type="text/javascript">
// initialize the logger for exception errors
Muninn = Muninn('ajohnson@membersfirst.com');
// setup error event listener to catch resource errors, and only report if there's a src (prevents logging undefined errors)
window.addEventListener('error', function(e) { 
  if(e.target.src){
    Muninn('There was a resource error on ' + e.target.src);
  }
  console.log('There was an uncaught error.')
  console.dir(e)
}, true);
</script>
```

 TODO:
 add tests
