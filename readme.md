Brief Documentation:

    Features:
    1. Login Authentication with Spotify.
    2. Play Songs.
    3. Like songs to add them to "Liked" category.
    4. Play Songs for as long as you want without caring for session expiry.
    
    -Spotify API is being used to fetch the songs.

    In order to successfully run the project-
        1. Create a new app on Spotify Develop's Account.
        2. Get the Client ID and Client Secret ID of your App.
        3. Set the redirect URL in the settings of your newly created app on Spotify Dev Account to - "http://localhost:3000"
        4. Save the changes.
        5. Fill in the "clientId" and "clientSecret" in the routes created in server.js file in the server directory.
    
    Now,
    -To run the frontend, cd to "moonlight-music" and
        npm start
    -To run the server, cd to "server" and
        npm run devStart    

HAPPY PLAYING !
Enjoy your Favorite songs on your own Moonlight Music Player.
(Updates to this player would soon be released)
