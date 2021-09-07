# Overview

Backend supplying data for Soundside Church's forms.

This API is somewhat RESTful with limited routes. 

# Routes

- GET '/submissions' - returns data for all submissions, organized by date and guest status. 
- POST '/submissions' - user posts a new submission
- GET '/forms' - returns data for all forms

# Backend Technologies

- Sequalize
- PostgreSQL
- Express

# TODO's

## Phase 1

- [ ] Lock '/submissions' route behind a password