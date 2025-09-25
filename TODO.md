# TODO: Mood Tracker Redirect Implementation

## Completed Tasks
- [x] Update Navigation.tsx to make the mood tracker button redirect to http://127.0.0.1:5002
- [x] Update moodtracker/index.html to make the "Next" button redirect to http://localhost:8080/mood

## Followup Steps
- [ ] Test the redirects by running the apps and clicking the buttons
  - Start the main app (likely on localhost:8080)
  - Start the moodtracker Flask app on 127.0.0.1:5002
  - Click the mood tracker button in the menubar to verify redirect to 127.0.0.1:5002
  - On the moodtracker page, upload an image or take a photo, then click "Next" to verify redirect to localhost:8080/mood
