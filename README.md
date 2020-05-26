# User Reporting System Assignment


### Background
You are tasked to come out with a simple Node JS / Angular program has 2 types of users (Admin & Normal) users.
Normal users can be created through the system and Admin user can be prefixed.
The program should be able to accept a report from a normal user through a form interface. 
Each report should contain the following:
1.	Date
2.	Username
3.	Report content (Multiline text)

Each report should not appear in the system until the Admin approves it.
Admin should be able to see the list of entries from the users and can accept, edit and approved.
Only when the entry is approved, it should be shown in the system. And the report should be modified with the approved date and time. 


### Libraries and Database
ReactJs v16.13.1

SQLite3  v4.2.0


### Setup

Install node modules dependencies and run migration script:
```
npm run init
```

Start application node server and react app concurrently:
```
npm run dev
```


### Premade User Credentials

#### Admin User (fixed)
Username: administrator

Password: @admin123

#### Dummy Users
1. Username: geralt_of_rivia 
   Password: yennifer
   
2. Username: jon_snow
   Password: kingofthenorth
   
   

#### (*Do note that new users can be registered at login page)


### Reports Status
Normal users are only able to view reports that are in 'APPROVED' or 'DELETED' status.

Newly submitted reports will be in 'PENDING' status. 

Admin user has to approve the report before the user can view the submitted report.


### Testing framework

Mocha and Chai



