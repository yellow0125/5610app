# Assignment 1

This is the starting readme for this assignment.

- Name: *Huang Cuiting*
- Description: *homework02 - Create a web app using node.js and Express that does CRUD (Create, Read, Update and Delete) operations using MongoDB. 

For whole app, there are two parts: admin and display page(home), also MongoDB database we implement the CRUD in db.js


For home: homepage will show allarticles in database and the details of each article.

## Basic Objective and  Setup instructions
- ADMIN

For admin: login, register, personal profifle, articles add/modify/delete/,  logout

When user try to visit the profile articles add/modify/delete/, logout. Must login first.
So there is the loginGuard

When login success,   'req.session.username = user.name;req.app.locals.userInfo = user'
On the right of the headernav will show the username and logout, otherwise show sign in and sign up.


 instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:admin/register  | render registerpage | currentlink register
post:register-form  | call register.js | msg of check with input


First:check if each input of this form is empty, if true, alter a note.
Next:check the input using 'express-validator'
-email must be valid with the correct format and unique
-username the length from 2 to 12 and unique
-password must be the strong one that at least 8 Characters with 1 UPPERCASE, 1 Lowercase, 1 Number and 1 Symbols'
When the input is invalid will render to the registerpage again. and show the message of error on the bottom of page.

Then: if all input is valid, use 'bcrypt making the password to a hashpassoword. Saving the new user into the database with Model user include the register date which is defalut the date.now
Final:After show the message "create success", jumping to loginpage

 instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:admin/login  | render loginpage | currentlink login
post:login-form  | call login.js | msg of check with input matching database

First:check if each input of this form is empty, if true, send the msg and render loginpage

Next:check the input, email and passoword whether matches database.
If true, jump to the profile page of user, or send msg 'email or psw is incorrect'
The message will show on the bottom of page. Also catch a server error if exists.
Also save the userInfo of login

 instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:admin/profile  | render profile | currentlink user

 This page will show userInfo of the user logged in. 
 On the left nav, there are the email, name, and date of register.
 In the middle, there is the total number of articles he has published.
 The list of article is sorted by pubdate. 
 =Paging
 It will show only 5 results in each page. 
 There are three button: edit, delete and post new article.
 Also you can see the details of article when you click the title.

  instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:admin/article-edit  | render edit.art | currentlink user
 post:admin/article-add | call addfile.js | save new to database
 post:admin/article-modify | call modifyfile.js | update article to database

 When click the 'new article'， it will call admin/edit, input all info of article then submit.
 Then, call post order to article-add.
 When click the 'edit button' behind the title, it will render admin/modify, show details of current article on the page.
 Then submit and call post order to article-modify.
 If cancel， back to profile page.

   instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:admin/delete  | call delete.js | redirect profile page
 
Delete the target article from the database.
 
- HOME

When there is not any order, it will default to the homepage, show all articles according to the otherGuard.

 instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:home/  | render default.art | currentlink home

 This page will show all articles of data page
 -Paging
 It will show only 4 results in each page. 
 Also you can see the details of article when you click the title or images.

  instruct order  | operation  | Query message
 ---- | ----- | ------  
 get:home/article-detail  | render article-detail | currentlink home
  This page will show details of the target article.



### Views

- Views
There are two part of views home and admin. I use 'art engine' to render the public page
Each page has the same headernav, it will be different according to whether there is a user logger.
They have same layout. The profile page and article add/modify have the same left nav.
homepage and profile need to be paging
Also there is an error page. When user try to login and fail, it will show the info and jump to login page again after 3 sec.


##### Mongodb
- Connect: connect to database
- saveUser:create a new user
- FindUser: check if user exist


- saveArticle: create a new article
- deleteArticle: findOneAndDelete
- findAllArticles: find all articles and merge with the info of author using #aggregate# 
  show all articles on the default page, 4 result per page.
  sort by pubdate
- countAllArticle：count the number of all articles
- countArticle: By author count the number of articles 
- findArticles:  By author 
  find all articles and merge with the info of author
  show list articles on the profile page, 5 result per page.
  sort by pubdate
- findArticle: find the target article by title and show its details on the page.
- update: find and update the info of the target article.


