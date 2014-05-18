Potential Bugs
---------------
-When a user creates a game, the user could join his own game.  Unlikely because the app would redirect you to the next page, but consider guarding against it.

Known Bugs
-----------
-Two users with the same name joining the same game
-Can we detect when a user leaves the waiting room so it updates that database and the front end?  There's a danger of the user pressing the back button and rejoining the game room (two copies of the user in the database).

Design Decisions
----------------
Drawers : will not see them drawing; page will only display a paintbrush
Guessers : sees everybody's progress


localStorage
------------
- active: Whether the room is available to join or not
- numDrawers: The number of drawers in the game.  This is to detect when the game is ready to start.
- game: Name of the game that the user is currently playing.
- imageFile: The file name of the random image assigned to the game.
- imageName: The name of the random image assigned to the game.
- username: Name of the user,
- waiting: Boolean flag to see if the user has already entered the waiting room.  This is to prevent the bug where the user refreshes in the waiting room and simualtes another user entering the waiting room.
