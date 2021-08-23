# Devshare

[Devshare](https://devshare.netlify.app/) is the destination for developers to share and discover company insights such as reviews, salaries, work experiences, culture, benefits and interviews anonymously.

## Table of Contents

- [Stakeholders](#stakeholders)
- [Installation and Setup](#installation-and-setup)
- [Environments and Deployments](#environments-and-deployments)
- [Artefacts](#artefacts)

- [Performance Screenshot](#performance-screenshot)

- [Features](#features)

- [Upcoming Features](#upcoming-features)

- [Third party tools](#third-party-tools)

- [Tech Stack](#tech-stack)

## Stakeholders

- Prashant Sawant - [LinkedIn](https://www.linkedin.com/in/iprashantsawant/) - [GitHub](https://github.com/iprashantsawant)

- Narendra Joshi - [LinkedIn](https://www.linkedin.com/in/narendra-joshi/) - [GitHub](https://github.com/joshinar)

## Installation and Setup

- Run `git clone https://github.com/pesto-students/N5-DEV-SHARE-GAMMA-5.git`

- Run `npm install `

- Run `npx lerna bootstrap`

- Add `.env file in ./packages/frontend with firebase config`

- Run `npm run start`

## Environments and Deployments

| Environment | Base URL | Description  
| :-------:   | :------: | :----------: | :--------: |
| Development | [http://localhost:3000](http://localhost:3000) | When running locally on machine 
| QA| [https://qa-devshare.netlify.app/](https://preproduction-sector17.netlify.app) | QA  Environment | 
| Staging | [https://staging-devshare.netlify.app/](https://staging-sector17.netlify.app) | Staging Environment
| Production | [https://devshare.netlify.app/](https://sector17.netlify.app/) | Main production environment  

## Artefacts

- [PRD](https://drive.google.com/file/d/1NUVcxsFpoeR43JxRrTS2FlLtAXVpuuks/view?usp=sharing)

- [One Pager](https://drive.google.com/file/d/1ocjMlBr9le_34JaT_GGYzLWljDK5_sWo/view?usp=sharing)

- [UI Design Figma](https://www.figma.com/file/348S4tzFxXyKMT969Es9nZ/Devshare-Final?node-id=0%3A1)

- [System Design Figma](https://drive.google.com/file/d/1FzgTz33AlFh6iBiWSW-AMIZKX907CR_F/view?usp=sharing)

## Performance Screenshot

![alt text](https://firebasestorage.googleapis.com/v0/b/devshare-89972.appspot.com/o/lighthouse%20report_page-0001.jpg?alt=media&token=2701e5e2-94d2-4c46-bb58-203285dfcd59)

## Features

- **Authentication** - Email and password One user, one account

- **Search** - Help users to search companies, questions, users.

- **Filters** - Filter topics via categories such as culture, benefits etc.

- **Ask question** - Allow user to ask question on topics such as culture, salaries about a company anonymously.

- **Poll** - Allow user to start a poll anonymously.

- **Vote** - Allow users to vote an answer(Up vote/ Down vote).

- **Follow** - Allow users to follow companies in order to get customized feed.

- **Request Mentorship** - Allow user to request mentorship from employees.(completely anonymous)

## Upcoming Features

-Anonymous Voice calling for mentorship

-Integrate payment system to collect platform fee and process disbursements to mentors

-Integrate Review and Rating system

## Third party tools

- Netlify (To deploy frontend )

- Heroku (To deploy backend )

- Sentry.io (For error and performance insights)

## Tech Stack

- React JS
- SCSS

- Node JS / Express JS

- Firebase (Firestore DB, Authentication, Storage)

- Jest
