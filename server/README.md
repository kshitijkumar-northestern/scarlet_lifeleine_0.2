SCARLET LIFELINE API TESTS

=========================

http://localhost:8080/api/swagger-ui.html

Base URL: http://localhost:8080/api

1\. ADMIN ENDPOINTS

-----------------

1.1 Register Admin

POST /admins/register

Content-Type: application/json

{

    "username": "admin1",

    "password": "admin123",

    "name": "Admin User",

    "email": "admin@example.com"

}

1.2 Admin Login

POST /admins/login

Content-Type: application/json

{

    "username": "admin1",

    "password": "admin123"

}

1.3 Add Blood Bank

POST /admins/bloodbanks

Content-Type: application/json

{

    "name": "City Blood Bank",

    "address": "123 Main Street",

    "contactNumber": "1234567890",

    "inventory": {

        "A_POSITIVE": 10,

        "B_POSITIVE": 15,

        "O_NEGATIVE": 5,

        "AB_POSITIVE": 8,

        "A_NEGATIVE": 6,

        "B_NEGATIVE": 4,

        "AB_NEGATIVE": 3,

        "O_POSITIVE": 12

    }

}

1.4 Remove Blood Bank

DELETE /admins/bloodbanks/{bloodBankId}

1.5 Update Blood Bank Inventory

PUT /admins/bloodbanks/{bloodBankId}/inventory

Content-Type: application/json

{

    "A_POSITIVE": 20,

    "B_POSITIVE": 15,

    "O_NEGATIVE": 10,

    "AB_POSITIVE": 5,

    "A_NEGATIVE": 8,

    "B_NEGATIVE": 6,

    "AB_NEGATIVE": 4,

    "O_POSITIVE": 18

}

1.6 Update Appointment Status

PUT /admins/appointments/{appointmentId}/status?status=ACCEPTED

(status can be: PENDING, ACCEPTED, REJECTED)

2\. DONOR ENDPOINTS

-----------------

2.1 Register Donor

POST /donors/register

Content-Type: application/json

{

    "username": "donor1",

    "password": "donor123",

    "name": "John Doe",

    "email": "john@example.com",

    "bloodGroup": "A_POSITIVE",

    "phoneNumber": "9876543210",

    "address": "456 Park Avenue"

}

2.2 Donor Login

POST /donors/login

Content-Type: application/json

{

    "username": "donor1",

    "password": "donor123"

}

2.3 Create Appointment

POST /donors/appointments?donorId={donorId}

Content-Type: application/json

{

    "bloodBankId": "{bloodBankId}",

    "appointmentDate": "2024-11-25T10:30:00"

}

2.4 Get Donor Appointments

GET /donors/{donorId}/appointments

3\. BLOOD BANK ENDPOINTS

----------------------

3.1 Get All Blood Banks

GET /bloodbanks

3.2 Get Blood Bank Details

GET /bloodbanks/{bloodBankId}

3.3 Get Blood Bank Appointments

GET /bloodbanks/{bloodBankId}/appointments

4\. APPOINTMENT ENDPOINTS

-----------------------

4.1 Get Appointment Details

GET /appointments/{appointmentId}

CURL COMMANDS FOR TESTING

========================

1\. Register Admin:

curl -X POST http://localhost:8080/api/admins/register

-H "Content-Type: application/json"

-d '{

    "username": "admin1",

    "password": "admin123",

    "name": "Admin User",

    "email": "admin@example.com"

}'

2\. Register Donor:

curl -X POST http://localhost:8080/api/donors/register

-H "Content-Type: application/json"

-d '{

    "username": "donor1",

    "password": "donor123",

    "name": "John Doe",

    "email": "john@example.com",

    "bloodGroup": "A_POSITIVE",

    "phoneNumber": "9876543210",

    "address": "456 Park Avenue"

}'

3\. Add Blood Bank:

curl -X POST http://localhost:8080/api/admins/bloodbanks

-H "Content-Type: application/json"

-d '{

    "name": "City Blood Bank",

    "address": "123 Main Street",

    "contactNumber": "1234567890",

    "inventory": {

        "A_POSITIVE": 10,

        "B_POSITIVE": 15,

        "O_NEGATIVE": 5,

        "AB_POSITIVE": 8

    }

}'

4\. Create Appointment:

curl -X POST "http://localhost:8080/api/donors/appointments?donorId={donorId}"

-H "Content-Type: application/json"

-d '{

    "bloodBankId": "{bloodBankId}",

    "appointmentDate": "2024-11-25T10:30:00"

}'

5\. Update Appointment Status:

curl -X PUT "http://localhost:8080/api/admins/appointments/{appointmentId}/status?status=ACCEPTED"

6\. Get All Blood Banks:

curl -X GET http://localhost:8080/api/bloodbanks

7\. Get Donor Appointments:

curl -X GET http://localhost:8080/api/donors/{donorId}/appointments

TESTING SEQUENCE

===============

1\. Register an admin

2\. Register a donor

3\. Admin adds a blood bank

4\. Get all blood banks to note the bloodBankId

5\. Create an appointment using donor and blood bank IDs

6\. Update appointment status

7\. Verify appointment details

8\. Check donor's appointments

9\. Check blood bank's appointments

10\. Update blood bank inventory

11\. Verify updated inventory

NOTES

=====

- Replace {donorId}, {bloodBankId}, and {appointmentId} with actual IDs from your database

- All dates should be in ISO 8601 format

- Blood groups must be one of: A_POSITIVE, A_NEGATIVE, B_POSITIVE, B_NEGATIVE, AB_POSITIVE, AB_NEGATIVE, O_POSITIVE, O_NEGATIVE

- Appointment status must be one of: PENDING, ACCEPTED, REJECTED

- All requests are unauthenticated for testing purposes

- MongoDB must be running on localhost:27017

ERROR SCENARIOS TO TEST

======================

1\. Duplicate username registration

2\. Invalid blood group

3\. Invalid appointment status

4\. Non-existent blood bank ID

5\. Non-existent donor ID

6\. Non-existent appointment ID

7\. Invalid date format

8\. Past appointment date

9\. Invalid inventory values (negative numbers)

10\. Missing required fields
