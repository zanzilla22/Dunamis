# Dunamis
_Dunamis (Ancient Greek: δύναμις) is a Greek philosophical concept meaning "power", "potential" or "ability"_

CNLC '24 Coding Submission | Platform where students, co-op managers, SHSM heads and organizers can collaborate.
# Now deployed on https://mydunamis.vercel.app

## High-Level Summary
Dunamis is a comprehensive platform designed to bridge the gap between students, educators, and businesses in career development and co-operative education. 
It leverages technology to provide an integrated environment where users can explore educational opportunities, co-op placements, and professional mentorship.
## Features
- **Chatbot Assistance:** Guided navigation throughout the platform to help users find the necessary information and resources.
- **Co-op Matching System:** A dynamic interface where businesses can post opportunities and students can apply for them, powered by real-time data from Ontario's live co-op listings.
- **SHSM Collaboration Platform:** A dedicated space for SHSM managers and participants to plan trips, certifications, and find collaborators.
- **Contact Tracker:** A CRM-style feature for tracking communications with partners, including direct email capabilities within the platform.
- **User Profiles:** Customized profiles for students, teachers, and company representatives, allowing for resume uploads, role listings, and direct communication.
### User Types
- **Student:** Students can display their resume and transcript on their profile to submit applications to various listed co-op positions. Students can communicate directly with co-op managers to facilitate career development.
- **Co-op Manager:** Co-op managers can represent their company and list available roles for which they are recruiting. Subsequently, they can list targetted skill sets and look for students in certain SHSM programs or courses.
- **SHSM Managers:** Teachers running SHSM programs at their school can list their subjects, courses and a description of their program (given that SHSM can vary from school to school). Dunamis can help managers find companies with which to partner for trips and certifications.
## Getting started

#### Step 1: Clone the repository

```bash
git clone https://github.com/zanzilla22/Dunamis
```

```bash
cd Dunamis
```
#### Step 2: Create Your MongoDB Account and Database/Cluster

- Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.

- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change `<password>` with your own password

- add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

#### Step 3: Edit the Environment File

- Check a file named .env in the /api directory.

  This file will store environment variables for the project to run.

#### Step 4: Update MongoDB URI

In the .env file, find the line that reads:

`DATABASE="your-mongodb-uri"`

Replace "your-mongodb-uri" with the actual URI of your MongoDB database.
#### Step 5: Install Backend Dependencies

In your terminal, navigate to the /api directory

```bash
cd backend
```

the urn the following command to install the backend dependencies:

```bash
npm install
```

This command will install all the required packages specified in the package.json file.

#### Step 6: Run Backend Script

While still in the /api directory of the project, execute the following command to run the setup script:

```bash
npm start
```

This should connect to the backend server. Without issue

This command will start the backend server, and it will listen for incoming requests.
#### Step 7: Install Frontend Dependencies

Open a new terminal window, and run the following command to install the frontend dependencies:

```bash
cd client
```

```bash
npm install
```

#### Step 8: Run the Frontend Server

After installing the frontend dependencies, you need to change openssl to legacy:
```bash
set NODE_OPTIONS=--openssl-legacy-provider
```
Then run the following command in the same terminal to start the frontend server:

```bash
npm start
```

This command will start the frontend server, and you'll be able to access the website on localhost:3000 in your web browser.

:exclamation: :warning:` If you encounter an OpenSSL error while running the frontend server, follow these additional steps:`

Reason behind error: This is caused by the node.js V17 compatible issues with OpenSSL, see [this](https://github.com/nodejs/node/issues/40547) and [this](https://github.com/webpack/webpack/issues/14532) issue on GitHub.

Try one of these and error will be solved

- > upgrade to Node.js v20.

- > Enable legacy OpenSSL provider

Here is how you can enable legacy OpenSSL provider

- On Unix-like (Linux, macOS, Git bash, etc.)

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

- On Windows command prompt:

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

- On PowerShell:

```bash
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```

Here is [reference](https://github.com/webpack/webpack/issues/14532#issuecomment-947012063) about enabling legacy OpenSSL provider

After trying above solutions, run below command

```bash
npm start
```

> If you still facing issue, then follow [this stackoverflow thread](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported). It has so many different types of opinions. You definitely have solution after going through the thread.
