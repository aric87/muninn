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
 TODO:
 catch resource errors
 handle reporting to the user better than an alert
 make said user reporting optional.
 add tests
