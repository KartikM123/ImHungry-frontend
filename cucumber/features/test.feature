Feature:
	Manage "To Explore", "Do Not Show", and "Favorites" lists

Background: 
	Given I am on the Lists Page of the I'm Hungry website

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