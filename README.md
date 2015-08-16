# Accounts-sms-demo

This package is a demo of the accounts-sms system with twilio text messaging to verify users.
It uses the semantic:ui package for styling.

Create a file settings.json to setup your twilio credentials

```json
{
   "TWILIO": {
	   "FROM": "(251) 333-0442",
	   "SID": "",
	   "TOKEN": ""
   }
}
```

where the FROM phone number must match your twilio phone number if you do not have alphanumeric caller ID support enabled.
Start meteor with

meteor run --settings settings.json
