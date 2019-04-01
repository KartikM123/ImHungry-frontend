Feature:
	View restaurant details page
	
Background:
	
Scenario Outline: General page design
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult> 
	Then I should see a white smoke background
	And I should see the Printable Version button
	And I should see the Back to Results button
	And I should see the Add to List button
	And I should see the website link
	And I should see the Address title
	And I should see the Phone Number title
	
	Examples:
	| food | numresults | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |
	
Scenario Outline: Dropdown default
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult> 
	Then I should see a blank dropdown as default
	
	Examples:
	| food | numresults | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |
	
Scenario Outline: Dropdown options
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult> 
	When I click on the dropdown
	Then I should see the different lists
	
	Examples:
	| food | numresults | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |
	
	
Scenario Outline: Page info for specific restaurant
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresults>
	Then I should see name <name>
	And I should see address 
	And I should see phone number
	
	Examples:
	| food | numresults | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |
	
Scenario Outline: Selecting Add to List with nothing chosen
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresults>
	When the dropdown is blank
	And I select the Add to List button
	Then I should remain on the Restaurant Page
	
	Examples:
	| food | numresults | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |
	

Scenario Outline: Adding a restaurant to a list 
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult> 
	When I select <list> in the dropdown
	And I select the Add to List button
	Then I should see item <name> in list <list>
	
	Examples:
	| food | numresults | id | name | list | listPage |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" | "Favorites" | "Favorites" |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" | "To Explore" |"ToExplore" |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" | "Do Not Show" |"DoNotShow" |

Scenario Outline: Selecting Back to Results
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresults>
	And I select the Back to Results button
	Then I should see the Results Page for <food> 
	And I should see <numresults> items for recipe and restaurants
	
	Examples:
	| food | numresults | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |
	

