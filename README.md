First of all this is the template I want to use: https://www.creative-tim.com/product/black-dashboard
I send you a screenshot of the modified version I want to use.

Regarding the functionality: 
    If we click on "Add Member", the form should be locked, 
    until a trainer types in his RFID Key, 
    which is stored in the database as the variable "RFID_ID". 
    Afterwards a form appears, which the trainer fills out. 
    When clicking on the button it should be send to the database and stored. 
    I summarized the functionality of "Add Member" in a Diagram for you

In Idle mode, nothing happens until the RFID_ID key of a member is received as input. 
    When a number is typed in, it compares the amount of credits. 
    Premium and Trainer members can just access. 
    The credits indicates the amount of allowed entrances. 
    For regular members the credits are decreased by 1. 
    If the member doesn't have enough credits, the access is denied. 
    Each week on Monday the credits get restored to 3 credits for regular members. 
    It should also check, if the contract is finished, by comparing the registration date + contract duration to the actual date. 
    Access is denied if this case is true.
    When the check in is successfull, the member specific data from database should be displayed, which are: Name, Last entrance time and the amount of left credits.
    For regular member the check-in is blocked for 1h after they checked in once, so they can't wrongly check-in 2 times. I added a diagramm for that too.

The "Member database" should simply display all members in the database in columns. 
    Simply like an Excel sheet. 
    Only accessible for trainers, after entering their RFID key. 
    It should be able to perform operations like deleting or updating member variables.