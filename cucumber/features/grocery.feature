Feature:
	Add, delete, and view groceries

Background:
	Given I am on the Register page of the I'm Hungry website for Grocery Testing
	
@long
Scenario Outline: General page design
	Given I am on a unique signin for Grocery Testing
	When I search for <item> with <num> amount and <radius> in miles for Grocery Testing
	And I navigate to Grocery page for Grocery Testing

	Examples:
	| item | num | radius |
	| "burger" | "5" | "3" |
@long
Scenario Outline: Add an item 
	Given I am on a unique signin for Grocery Testing
	When I search for <item> with <num> amount and <radius> in miles for Grocery Testing
	And I navigate to recipe <recipe> page for Grocery Testing
	And I save ingredients <ingredient1> and <ingredient2> for Grocery Testing
	And I navigate to Grocery page for Grocery Testing
	Then I should see <ingredient1> and <ingredient2> for Grocery Testing

	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient2|
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "1 tbsp soft brown sugar" | "2 onions, very finely sliced" |
@long
Scenario Outline: Delete an item
	Given I am on a unique signin for Grocery Testing
	When I search for <item> with <num> amount and <radius> in miles for Grocery Testing
	And I navigate to Grocery page for Grocery Testing
	And I delete ingredient <ingredient1> for Grocery Testing
	And I logout of the account for Grocery Testing
	When I signin in as the unique signin for Grocery Testing
	And I navigate to Grocery page for Grocery Testing
	Then I should not see <ingredient1> and see <ingredient2> for Grocery Testing
	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient2 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "1 tbsp soft brown sugar" | "2 onions, very finely sliced" |
@long
Scenario Outline: Check out grocery items
	Given I am on a unique signin for Grocery Testing
	When I search for <item> with <num> amount and <radius> in miles for Grocery Testing
	And I navigate to Grocery page for Grocery Testing
	And I check on <ingredient> for Grocery Testing
	And I logout of the account for Grocery Testing
	When I signin in as the unique signin for Grocery Testing
	And I navigate to Grocery page for Grocery Testing
	Then I should see <ingredient> checked out for Grocery Testing
	Examples:
	| item | num | radius | ingredient |
	| "burger" | "5" | "3" | "2 onions, very finely sliced" |

Scenario Outline: Add up ingredients
	Given I am on a unique signin for Grocery Testing
	When I search for <item> with <num> amount and <radius> in miles for Grocery Testing
	And I navigate to recipe <recipe> page for Grocery Testing
	And I save ingredients <ingredient1> and <ingredient2> for Grocery Testing
	And I return to Results Page for Grocery Testing
	And I navigate to recipe <recipe> page for Grocery Testing
	And I save ingredients <ingredient1> and <ingredient2> for Grocery Testing
	And I navigate to Grocery page for Grocery Testing
	Then I should see double the <ingredient1> and <ingredient2> for Grocery Testing
	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient2|
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "4 tbsp hummus" | "2 tsp harissa" |