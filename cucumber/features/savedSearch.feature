Feature:
	Track and go back to previous searches

Background:
	Given I am on the Register page of the I'm Hungry website for Saved Searches Testing
Scenario Outline: Adding different search results to history
	Given I am on a unique signin for Saved Searches Testing
	When I search for the <item> with <num> amount and <radius> in miles for Saved Searches Testing
	And I navigate back to Search Page for Saved Searches testing
	When I search for the <item2> with <num2> amount and <radius2> in miles for Saved Searches Testing
	Then I should see search result <item> for Saved Searches Testing

	Examples:
	| item | num | radius | item2 | num2 | radius2 | 
	| "burger" | "5" | "3" | "chinese" | "5" | "3" |

Scenario Outline: Navigate to a search result within Saved Search
	Given I am on a unique signin for Saved Searches Testing
	When I search for the <item> with <num> amount and <radius> in miles for Saved Searches Testing
	And I navigate back to Search Page for Saved Searches testing
	When I search for the <item2> with <num2> amount and <radius2> in miles for Saved Searches Testing
	Then I should see search result <item> for Saved Searches Testing
	When I click on search result <item> for Saved Searches Testing
	Then I should see search result <item2> for Saved Searches Testing

	Examples:
	| item | num | radius | item2 | num2 | radius2 | 
	| "burger" | "5" | "3" | "chinese" | "5" | "3" |

Scenario Outline: Navigate to a search result among others with different radius and numbers within Saved Search
	Given I am on a unique signin for Saved Searches Testing
	When I search for the <item> with <num> amount and <radius> in miles for Saved Searches Testing
	And I navigate back to Search Page for Saved Searches testing
	When I search for the <item2> with <num2> amount and <radius2> in miles for Saved Searches Testing
	And I navigate back to Search Page for Saved Searches testing
	When I search for the <item3> with <num3> amount and <radius3> in miles for Saved Searches Testing
	When I click on search result <item> for Saved Searches Testing
	Then I should see only <num2> items
	Examples:
	| item | num | radius | item2 | num2 | radius2 | item3 | num3 | radius3 |
	| "burger" | "5" | "3" | "burger" | "2" | "4" | "burger" | "5" | "1" |
