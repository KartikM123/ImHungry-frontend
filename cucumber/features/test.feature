Feature:
	Manage "To Explore", "Do Not Show", and "Favorites" lists

Background: 
	Given I am on the Lists Page of the I'm Hungry website

Scenario Outline: Move List Item
	Given I am on a valid signin
	Given I search for Burger
    Then I add a Restaurant
	Given Favorites is shown
  	Then I should be able to move <name> from Favorites to To Explore
	
	Examples:
	| food | numresult | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |