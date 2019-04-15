Feature:
	Add, delete, and view groceries

Background: 

Scenario Outline: General page design
	Given I am on a unique signin
	Given I am on the Recipe page for recipe <id> from search <food> with count <count> logged in
	When I add the ingredient <ingredient>
	And I navigate to the Grocery page
	Then I should see the Grocery page with <ingredient>

	Examples:
	| food | count | id | page | ingredient |
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" |Recipe |  "1 tbsp soft brown sugar" |

Scenario Outline: Add an item 
	Given I am on a unique signin
	When I add the <ingredient> from the Recipe page
	And I navigate to the Grocery page
	Then I should see the Grocery page with <ingredient>

	Examples:
	| ingredient |
	| "2 onions, very finely sliced" |

Scenario Outline: Delete an item
	Given I am on a unique signin
	Given I am on the Grocery page 
	When I delete the <ingredient>
	Then I should not see the deleted <ingredient>

	Examples:
	| ingredient |
	| "1 tbsp soft brown sugar" |