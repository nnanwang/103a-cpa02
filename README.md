# CPA02 - Web Apps
### due Friday 4/29 11am  on mastery.cs.brandeis.edu 
CS103a-Programs PIN:7297444

## Motivation 
A large fraction of software development involves designing, implementing, deploying, and monitoring interactive database backed web applications.  PA03 gave you some experience making modifications to such an application, but it will help your future career to have an app that you personally have developed, starting from the PA03 base.

## What to do
1. create a git repository called cs103a-cpa02 with a README.md file and clone it to your computer, make sure to add a .gitignore file which should have .DS_Store and node_modules  in it, at least.
2. create a mongodb atlas URL for your own cloud-based mongodb database
3. decide on an application that you want to create and which will demonstrate your mastery of the following concepts:

     a. creating a Mongoose Scheme (in the models folder)

     b. creating EJS pages with HTML forms and Bootstrap layout
     
     c. writing app.js routers to process data collected from the forms and using it to make queries to your mongodb database with your cloud URL

     d. creating EJS pages to display the results of a mongodb query
     
4. write and test the code locally on your computer using your cloud-based database
5. push your code to github (actually make frequent commits and pushes, but only push working code)
6. create a free heroku.com account and push your code to heroku (so the server and and database are now both running in the cloud). The mongodb URL should be stored in an environment variable and not pushed to github 
7. write the README.md page to clearly explain to users

     a. what your app does and how to use it (with screenshots)
     
     b. how to install and run your app locally
     
8. create a short 2-5 minute video pitching your app idea and giving a demo of your "proof of concept", upload the video to google drive (or something similar) and link it to your README.md file


## How to Submit your work
Submit on mastery
- a link to your app on heroku 
- a link to your repository
- answer the following few reflection questions:

     a. what did you learn while doing this assignment
     
     b. what challenges did you encounter
     
     c. what would you do if you had another month to work on this project

## What and How to submit

1. You should make a short Zoom recording (about 1-5 minutes) stored in the cloud, showing mastery of the following six skills

     a. running the Jupyter notebook and showing the markdown and code cells you created (Jupyter)
     
     b. describe your dataset and the questions you were asking, and show the pandas code you wrote to read it in and show the columns and index and the table itself (pandas.read_csv)
     
     c. show a pivot table you created and interpret it (pandas.pivot_table)
     
     d. show the plot you made from the pivot table (pandas,plot) the plot should have labels on the axes and a title and a legend
     
     e. show your use of groupby and interpret the results (pandas.groupby)
     
     f. describe what your analysis tells you about the questions you asked (pandas.analysis)
     
     g. upload links to the github repository and a link t your Zoom movie to the CPA01 problem on the Master-Programs site (with PIN 7297444)

### the due date is Friday 3/11 before 11am (as we start grading at 11)


## Rubric  (Sorry this was the old rubric, I've updated it now)
We wil grade this using a Specs grading approach looking for mastery of the following skills, so make sure that you demonstrate yourself mastering these skills in your movie!
1. github - using a github repository for a solo project
2. Jupyter: running queries and writing markdown using Jupyter lab
3. pandas.read_csv  be able to read a CSV file into a pandas data table and clean the data
4. pandas.pivot_table be able to create a pivot table from a pandas data frame
5. pandas.plot be able to use the plot feature to plot columns in a dataframe vs the index
6. pandas analysis be able to use pandas to answer interesting questions about a dataset
We hope and expect that everyone will demonstrate mastery of all 6 of these skills in this PA. If not, then you will have an opportunity to demonstrate mastery in later homework assignments.

For those students with more experience in Python programming, I encourage you to go beyond this assignment and do something you can add to your ePortfolio. It could help you find an internship or job. 
