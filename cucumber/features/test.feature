Feature:
	View multiple restaurant and recipe results

Background: 
	Given I am on the Results Page of the I'm Hungry website

Scenario: Pagination rollover items
    Given I am on a unique signin
	And I look for uneven results
    Then I go to the seventh page
    Then only one recipe should exist
Scenario: Pagination no restaurant
	Given I am on a unique signin
	And I look for small radius
	Then restaurant should be empty
