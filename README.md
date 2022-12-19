# Scrappy

## Project Details
- **Project Name**: Scrappy
- **Project Description**: Scrappy is a photo sharing/scrapbook creating site. Users 
can, every day, start a new scrapbook that contains information about the day,
and their own personal "pages" they add to a book. Default information includes 
the New York Times Headline of the Day and a generated inspirational quote. 
Throughout the day, a user can add images to the book with captions. At midnight 
EST, the book closes, and users are left with a memorable recap of their day to 
reflect on in the future.
- **Features**: Users can have friends who can see each other’s books, and even see
relevant posts based on their provided interests ("tags"). Each “entry” to a 
scrapbook can be thought of as a post object. Entries marked as public will go 
to a gallery view of different posts, where an algorithm presents the most 
interesting/relevant posts. A post designated as private can be in a seperate 
chronological timeline only seen by friends. Friends are maintained through an 
authentication and login system. Users have a profile where they can view their 
scrapbooks and add to the daily book.
- **Total Estimated Time**: 
    - Backend: 30-35 hours
    - Frontend: 35-40 hours
- **Repository**: https://github.com/cs0320-f2022/term-project-acho28-gaiello1-jvandevo-tgurth-zboston2

### Team Members and Contributions
- Gianna Aiello (gaiello1):
    - Backend: New York Times and random quote API handlers (`QuoteHandler`, 
    `NYTHandler`)
    - Frontend: Added aria labels and worked on the content and css of `about`, 
    `faq`, and `help` pages
- Zachary Boston (zboston2): 
    - Backend: created MongoDB database with multiple collections to store data
    and created classes for each type of data being stored, along with a handler
    to add, update, and query the database
    - Frontend: AWS - saves images to be displayed on the website
    - Documentation and README
- Alana Cho (acho28):
    - Backend: created MongoDB database with multiple collections to store data
    and created classes for each type of data being stored, along with a handler
    to add, update, and query the database
    - Frontend: AWS - saves images to be displayed on the website
    - Documentation and README
- Tyler Gurth (tgurth):
    - Backend: sorting algorithm to determine relevant/interesting posts based
    on a user's list of tags
    - Frontend: Google Authentication, React page Routing, database integration, 
    CSS styling for whole site, account and state management, frontend React custom objects
- Jania Vandevoorde (jvandevo): 
    - Backend: New York Times and random quote API handlers (`QuoteHandler`, `NYTHandler`) + testing for the handlers
    - Frontend: header/footer functionality, book history, NYT/quote integration fetching, modals (login, friend search, add post)

## Design Choices
  - **CLASSES/INTERFACES**: 
    - Backend: 
        1. `database`: This folder contains the objects that will be stored in the
        database: User, Entry, and Book. Each of these contains setters for the 
        necessary fields (i.e. username, email, etc. for User). Additionally, the
        class MongoDB located in this directory allows us to create a MongoDB object
        that connects to a MongoClient, allowing all developers to view the database.
        It also initializes the desired collections for the database.
        2. `privacy`: A folder to contain private data we do not want pushed to 
        GitHub (i.e. password to view the database)
        3. `server`: This directory contains all the handlers to our backend server
        and the main Server class itself. The four handlers are for the database
        (updating, adding, and querying), the gallery (vectorizing tags and sorting
        them based on relevance), the New York Times API (returning the news headline
        of the day), and an inspirational quote API. In the Server, we instantiate
        our database and the paths to run our handlers.
        4. `utils`: The classes in this folder contain common utilities used throughout
        the program, such as JSON serialization/deserialization and Object to 
        Document conversion (for the database).
    - Frontend - 
      1. 
  - **DATA STRUCTURES**: 
    - 
  - **JUSTIFICATIONS**:
    - Accessibility: To make our webapp more accessible, we have added aria-labels
    and aria-roledescriptions to go along with our React components. This allows 
    differently abled users to utilize our program through the Screenreader and
    have a better understanding of its functionality. While we have done our best
    to make it as accessible as possible, we struggled to have the Screenreader fully
    convey what was on the screen, especially as it has many components that are
    frequently changing/updating.

## Bugs/Errors:
We have no known bugs or errors in this program.

## Tests:
For this project, we primarily chose to focus on testing the backend. Thus, the 
bulk of our tests were written in IntelliJ using JUnit in the HandlerTest file.
1. 
2. 
3. 

- NOTE: We also have very basic frontend tests to ensure all components render 
properly on the webapp (in App.test.tsx). However, we mostly determined frontend
functionality by actually using the webapp as prospective users.

## How To ...
  - **RUN TESTS**:
    - Backend - All tests can be run using the run button in IntelliJ, however 
    if a user wishes to run from the terminal, they can run the command mvn clean 
    test. If they wish to only run a specific test file, they can run mvn clean 
    test -Dtest=ServerTest (or other file). Note that you may have to run mvn 
    spotless:apply before these commands. 
    - Frontend - To run tests, cd into the frontend package and run npm test in 
    the terminal.
  - **BUILD AND RUN**:
    - Backend - To run the backend API server, we run the Server class in IntelliJ 
    (which contains the main method). This server can be accessed via localhost:3232 
    in a web browser. The API server has four different functionalities:
      - localhost:3232/database - allows frontend to add, update, or query for 
      objects in the database (i.e. users, books, entries)
      - localhost:3232/gallery - runs an algorithm to display a sorted list of
      relevant posts for a given user based on their tags
      - localhost:3232/nyt - returns a JSON containing the New York Times headline 
      of the day via a call to the NYT API
      - localhost:3232/quote - returns JSON containing an inspirational quote via 
      a call to an external API
    - Frontend - Next, we cd into the frontend directory in VSCode and run npm start. 
    This displays our full webapp via localhost:3000.

## User Stories & Acceptance Criteria
1. “As a user of our webapp, I can access "today's book" and upload photos that 
I have taken that day. I can also access a list of past books and view old entries.”
2. “As a user of our webapp, I can enter a title, caption, and hashtag into a daily 
prompt, which will then be displayed alongside the day’s photo(s).”
3. “As a user of our webapp, I can see daily information included in the day’s recap,
specifically daily news and an inspirational quote. This data will be 
displayed alongside my photo(s) and caption(s).”
4. “As a web developer using our program, I am able to register new daily 
information by providing an external web API to be accessed whenever that 
information is required.”
5. “As a user of our webapp, I must login to the website using my Google account 
in order to access past scrapbook entries.”
6. “As a user of our webapp, I can learn how to use the webapp by looking at the 
how to/ FAQ tab.”
7. “As a user of our webapp, I can learn how the webapp is using my personal 
information by looking at the privacy policy tab.”
8. "As a developer, I can access a database containing all the data from our webapp
(users, entries, books) via a connection URL (MongoClient) and a private password."
9. “As a user of our webapp, I can follow friends and view their public 
scrapbooks and share my scrapbooks (or privatize them if I would like). 
Friends can be found via username.”
10. “As a user of our webapp, I can view other users’ public posts in a gallery,
sorted via relevance to my interests (using an algorithm).”
11. "As a developer reading the comments in our code and our README, I am able to 
understand how to build and run your program (including tests), high level design 
decisions, and what each class/method is doing."

