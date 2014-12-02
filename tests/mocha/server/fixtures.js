//file: server/fixtures.js
Meteor.startup(function() {
   if (Meteor.users.find().count() == 0) {
       var users = [
           {name:"jim",email:"jim@jam.com", password: "electr1c"},
           {name:"mike",email:"mike@minus1.com", password: "electr1c"}
       ];
 
       _.each(users, function (user) {
           var id = Accounts.createUser({
               email: user.email,
               password: user.password,
               profile: { name: user.name }
           });
 
           if (user.roles.length > 0) {
               Roles.addUsersToRoles(id, user.roles);
           }
       });
   };
});