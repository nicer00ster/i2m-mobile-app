# I2M Mobile App v1.0.0 👨🏻‍💻
This app was created by I2M, for our clients convenience. It allows you to submit a ticket to our system with ease and without the hassle of sending an email to the address that somehow everyone forgets... Likely, none of our customers will be reading this README but if anyone would like to use this as a template for your own company, as long as your tech stack is similar to ours it should be very easy to convert some of the code over. It is cross-compatible so if your running on iOS or Android it will work.

###### git clone https://github.com/nicer00ster/i2m-mobile-app.git <br/>
###### npm install <br/>
###### Insert own credentials for AWS & ConnectWise <br/>
###### react-native run-android || react-native run-ios <br/>

# Stack 📚
#### React Native https://facebook.github.io/react-native/
#### AWS Amplify https://aws.github.io/aws-amplify/
#### Amazon Cognito, S3, Amazon Pinpoint https://aws.amazon.com/
#### Firebase https://firebase.google.com/ (was used in testing before converting everything to AWS)
#### ConnectWise API https://developer.connectwise.com/


# Features
## Sign Up & Login
- Uses Amazon Cognito to manage users who sign up and login.<br/>
- Sign up form requires first & last name, email, username, and password.<br/>
- Signing up sends a verification email.<br/>
- Set a regular expression in the sign up for to filter any email not used by our company.(you may change or remove this if you like)<br/>
- Password must use atleast 1 capital, 1 lowercase, and 1 number. Must be at least 8 characters long.

## Team Page
- Lists all the members of our team.
- Has a picture and thumbnail picture of each of us.
- Lists the roles we currently fill within our company.

## About Us
- Has a few logos of the clients we support.
- Smooth animations with short delays to render nicely onto the phone/simulator.
- A thank you note at the bottom that shows our appreciation to our customers.

## Submit Ticket
- Makes API calls to our ConnectWise endpoint.
- When a user submits a ticket, it retrieves their data through Amazon Cognito with their email, first & last name, and company. It sets all the forms within ConnectWise Manage so we know who the ticket belongs to.
- Within the app all the user is required to do is put a subject and body and click submit. 🔥🔥🔥

## Contact Us
- Simple page that provides further assistence if needed, with buttons that link to our phone number and email.
- *This feature requires an app to be live on an actual phone, and will not work on an android or iOS simulator.


<hr>
<h5 align="center">If your're planning on using this code for a personal or professional project, please get in touch with me first.
</h5>
<h6 align="center">-- nicer00ster</h6>
