Feature:
	View multiple restaurant and recipe results

Background: 
	Given I am on the Results Page of the I'm Hungry website

Scenario: Pagination no restaurant
	Given I am signed in for pag
	And I look for small radius
	Then restaurant should be empty

Scenario: Pagination subfive results
	Given I am signed in for pag
	And I look for subfive
	Then I should see previous and next disabled on the bottom

