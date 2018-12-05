## Todo:
* Add a delete confirmation page
* Properly indent the computer show page

# Antique Computer

*Add Landing Page
*Add Computers Page that lists all computers

Each Computer has:
*Name
*Image

# Layout and Basic Styling
*Create header and footer partials
*Add in bootstrap

# Adding New Computers
*Setup new computer POST route
*Add in body-parser
*Setup rout to show form
*Add basic unstyled form

# Style the navbar and form
*Add a navbar to all templates
*Style the new campground form



# Add Mongoose
*Install and Configure Mongoose
*Create Computer Schema and Model
*Use Computer Model Inside The Routes

# Show Page
*The RESTful routes so far are (there are 7 in total)
-INDEX  /computers       GET     display all computers
-NEW    /computers/new   GET     the form for adding new computers
-CREATE /computers       POST    add new computer to db

*Adding a new route
-SHOW   /computers/:id   GET     shows more info about one dog

v3

# Refactor Mongoose Code
*Create a models directory
*Use module.exports
* Require all models correcttly

# Add Seeds File
* Add a seeds.js file
 -seed files are used to store sample data for use in the app.
 -its like a makeshift database for the app
* Add the seeds everytime the server start

# Add Comments Model
* Create the comments models
* Display comments on computers show page

v4
# Comment New/Create
* Introduce nested routes (new comments form and create routes)
    -/computers/:id/comments/new         --- GET    ===      new comments form
    -/computers/:id/comments             --- POST   ===      Create comments
* Add the comment new and Create routes
* Add the new comment form

v5
# Finish Styling Show Page
* Add sidebar to show page
* Style comments

v6
# Auth
## Auth Add User Model
* Install all packages needed for auth
* Define user model

## Auth Add Configure Signup Routes
* Configure passport
* Add signup routes and templates
* Add logic for signup

## Auth Add Login Routes
* Configure login routes and templates
* Add logic for login

## Logout and Navbar logic
* Add logout route
* Prevent user from adding comments if not signed in
* Add links to navbar
* Show auth links on navbar correcttly

v7
## Refactor Routes
* Use express router to reorganize all routes

v8
## Users and Comments
* Associate users and comments
* Save author's name to a comment automatically

v9
## Users and Computers
* Prevent an unauthenticated user from adding a new computer
* Save usename+id to newly added computers

v10
## Editing Computers Entries
* Add method-override (for converting POST to PUT, DELETE) to computer routes file
* Add Edit Route for computers
* Add link on SHOW page to Edit page
* Add Update Route
* Fix $set problem

## Deleting Computers
* Add DESTROY route
* Add delete button on the SHOW page

## Authourization: Computers
* Permit only The User and Admin to edit User's Computer
* Permit only The User and Admin to delete User's Computer
* Only Show edit and delete button to User and Admin, and
* Hide edit and delete buttons from other users
*
<!--*//CHECK if user logged IN-->
<!--    //if true, check if the User id matches author's id-->
<!--        //if true, Authorized, edit computer-->
<!--        //else, not authourized, redirect back to show page-->
<!--//else, not authenticated, redirect back to show page-->
<!--    5b70e9642c06501d5543e33b-->

# Editing Comments
* Add Edit routes for comments
* Add Edit button
* Add Update route
<!--update route == computer/:id/comments/:comment_id-->

# Deleting Comments
* Add Destroy route
* Add Delete button

# Authourization: Comments
* Only User and Admin can edit User's comments
* Only User and Admin can delete User's comments
* Only show edit and delete buttons to comment owner and Admin
* Refactor Middleware

# Adding in Flash(Messages)
* Install and configure Connect-Flash
* Add in bootstrap messages(style flash messages)

