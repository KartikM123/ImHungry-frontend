Feature:
	View multiple restaurant and recipe results

Background: 
	Given I am on the Results Page of the I'm Hungry website

Scenario Outline: Pagination
	Given I am on a unique signin
	And I am on the Result page for a <food> with <numresult> results
	Then I should see buttons on the bottom
	
	Examples:
	| food | numresult |
	| "burger" | "5" |

Scenario Outline: Pagination functions for more than five results
	Given I am on a unique signin
	And I am on the Result page for a <food> with <numresult> results
	Then I should see <numresult> items for recipe and restaurants

	Examples:
	| food | numresult | perPage |
	| "burger" | "5" | "5" |

Scenario Outline: Using Pagination buttons

	Given I am on a unique signin
	And I am on the Result page for a <food> with <numresult> results
	When I press the next button
	Then I should see <perPage> restaurant names
	And I should see <perPage> restaurant address

	Examples:
	| food | numresult | perPage |
	| "burger" | "5" | "5" |

Scenario: Pagination over five pages
    Given I am on a unique signin
	And I look for many results
    Then I should see options one through five
    Then if I click four, I should see option six

Scenario: Pagination rollover items
    Given I am on a unique signin
	And I look for uneven results
    Then I go to the seventh page
    Then only one recipe should exist

