SinglePageLogin.config({
      loginTitle: 'T3 Login',
      signupTitle: 'T3 Signup',
      forgotPasswordTitle: 'Retrieve password',
      canRetrievePassword: true,
      passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
      forbidClientAccountCreation: false,
      routeAfterLogin: '/sections',
      routeAfterSignUp: '/',
      forceLogin: true,
	   exceptRoutes: ["signup",  "help"]
  });