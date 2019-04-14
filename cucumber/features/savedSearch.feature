Feature:
	Track and go back to previous searches

Background:

Scenario Outline: General page design
	Given I am on a unique signin
	Given I am on the Result page for a <food> with <numresults> results with <radius> radius
	When I navigate to the Saved Search page
	Then I should see Saved Search page with <food> with <numresults> results with <radius> radius

	Examples:
	| food | numresults | radius |
	| "burger" | "5" | "10000" | 

Scenario Outline: Add a search result
	Given I am on a unique signin
	When I search for <food> with <numresults> results with <radius> radius
	And I navigate to the Saved Search page
	Then I should see Saved Search page with <food> with <numresults> results with <radius> radius

	Examples:
	| food | numresults | radius |
	| "chinese" | "5" | "10000" | 

Scenario Outline: Navigate to a search result within Saved Search
	Given I am on a unique signin
	Given I am on the Saved Search page
	When I click on the row with <food> with <numresults> results with <radius> radius
	Then I should be on the Results Page for <food> with <numresults>

	Examples:
	| food | numresults | radius |
	| "burger" | "5" | "10000" | 
