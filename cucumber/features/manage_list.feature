Feature:
	Manage "To Explore", "Do Not Show", and "Favorites" lists

Background: 
	Given I am on the Lists Page of the I'm Hungry website

Scenario: General page design
	Given I am on a valid signin
	Then I should see a title of Favorite
	
Scenario: Dropdown Options
	Given I am on a valid signin
	Then I should see different lists, not including current list

Scenario Outline: Add page to list
  Given I am on a valid signin
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult>
	Then I should see name <name>
	And I should see address 
	And I should see phone number
	Then I should add to Favorites
	Given Favorites is shown
	Then I should see name <name>
	
	Examples:
	| food | numresult | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |

Scenario: Move List Item
  Given I am on a valid signin
  Given Favorites is shown
  Then I should be able to move item from Favorites to To Explore

Scenario Outline: Remove List Item
	Given I am on a valid signin
	Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult>
	Then I should see name <name>
	And I should see address 
	And I should see phone number
	Then I should add to Favorites
	Given Favorites is shown
  Then I should be able to remove item from Favorites
	
	Examples:
	| food | numresult | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |