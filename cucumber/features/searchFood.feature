Feature:
	Search restaurant and recipe results

Background: 
	Given I am on the Search Page of the I'm Hungry website

Scenario: page design
	Then I should see a I'm Hungry title
	And I should see a text field for food
	And I should see a field for number
	And I should see a submit button


Scenario Outline: try form with well formed inputs
	Given I am on a unique signin
	When I search for <food>
	And I search for <numresults> in the number box
	And I search for <radius> in the radius box
	And I press Submit
	Then I should be on the Results Page for <food> with <numresults>

	Examples:
	| food | numresults | radius |
	| "burger" | "5" | "3" |

Scenario Outline: try form without a food query
	When I search for <numresults> in the number box
	And I search for <radius> in the radius box

	And I press Submit
	Then I should see the Search Page
	
	Examples:
	| numresults | radius |
	| "5" | "3" |

Scenario Outline: try form with a fraction in number box
	When I search for <food>
	And I search for <numresults> in the number box
	And I search for <radius> in the radius box
	And I press Submit
	Then I should see the Search Page

	Examples:
	| food | numresults | radius |
	| "burger" | "0.5" | "3" |
	| "burger" | "1.23" |"3" |
	| "burger" | "10.5241" |"3" |


Scenario Outline: try form with a number less than 2 in number box
	When I search for <food>
	And I search for <numresults> in the number box	
	And I search for <radius> in the radius box
	And I press Submit
	Then I should see the Search Page

	Examples:
	| food | numresults | radius |
	| "burger" | "0" |"3" |
	| "burger" | "-1" |"3" |



