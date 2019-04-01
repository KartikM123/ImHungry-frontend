Feature:
	View recipe details page
	
Background:
	
Scenario Outline: General page design
	Given I am on the Recipe page for recipe <id> from search <food> with count <count>
	And I should see the Printable Version button
	And I should see the Back to Results button
	And I should see the Add to List button
	And I should see the prep time
	And I should see the cook time
	And I should see the ingredients title
	And I should see the instructions title
	
	Examples:
	| food | count | id | page | 
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" | Recipe |
	
Scenario Outline: Dropdown default
	Given I am on the Recipe page for recipe <id> from search <food> with count <count>
	Then I should see a blank dropdown as default
	
	Examples:
	| food | count | id | 
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" |

Scenario Outline: Dropdown options
	Given I am on the Recipe page for recipe <id> from search <food> with count <count>
	When I click on the dropdown
	Then I should see the different lists
	
	Examples:
	| food | count | id | 
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" |
	
Scenario Outline: Page info for specific recipe
	Given I am on the Recipe page for recipe <id> from search <food> with count <count>
	Then I should see recipe title <id>
	And I should see the prep time
	And I should see the cook time
	
	Examples:
	| food | count | id | 
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" |
	


Scenario Outline: Selecting Back to Results
	Given I am on the Recipe page for recipe <id> from search <food> with count <count>
	And I select the Back to Results button
	Then I should see the Results Page for <food> 
	And I should see <count> items for recipe and restaurants
	
	Examples:
	| food | count | id | 
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" |
	

Scenario Outline: Adding a recipe to a list 
	Given I am on the Recipe page for recipe <id> from search <food> with count <count> 
	When I select <list> in the dropdown
	And I select the Add to List button
	Then I should see item <name> in list <list>
	
	Examples:
	| food | count | id | name | list |listPage |
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" | "Halloumi aubergine burgers with harissa relish" | "Favorites" | "Favorites" |
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" | "Halloumi aubergine burgers with harissa relish" | "Do Not Show" |"DoNotShow" |
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" | "Halloumi aubergine burgers with harissa relish" | "To Explore" | "ToExplore" |
	

	
