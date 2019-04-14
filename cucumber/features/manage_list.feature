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


Scenario Outline: Move List Item
	Given I am on a valid signin
	Given I search for Burger
    Then I add a Restaurant
	Given Favorites is shown
  	Then I should be able to move <name> from Favorites to To Explore
	
	Examples:
	| food | numresult | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |

Scenario Outline: Remove List Item
	Given I am on a valid signin
	Given I search for Burger
    Then I add a Restaurant
	Given Favorites is shown
  	Then I should be able to remove item from Favorites
	
	Examples:
	| food | numresult | id | name |
	| "burger" | "5" | "The Habit Burger Grill" |"The Habit Burger Grill" |

Scenario: Reorder List Item
	Given I am on a unique signin
	Given I search for Burger
    Then I add a Restaurant
    Then I add a Recipe
    Given Favorites is shown
    Then click down should move restaurant down
    Then click up should move restaurant up
    Then click up should move recipe up
    Then click down should move recipe down
    Then page should clean


