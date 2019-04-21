Feature:
	Maintain information beyond sessions at a time to indicate data is being recorded

Background: 
	Given I am on the Sign In page of the I'm Hungry website for Session Testing

Scenario Outline: Save Grocery information
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to recipe <recipe> page for Session Testing
	And I save <ingredient1> and <ingredient2> for Session Testing
	And I exit out of the browser for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to Grocery page for Session Testing
	Then I should see <ingredient1> and <ingredient2> for Session Testing

	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient 2|
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "1 tbsp soft brown sugar" | "2 onions, very finely sliced" |

Scenario Outline: Delete Grocery
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to Grocery page for Session Testing
	And I delete <ingredient1> for Session Testing
	And I exit out of the browser for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to Grocery page for Session Testing
	Then I should not see <ingredient1> and see <ingredient2> for Session Testing
	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient2 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "1 tbsp soft brown sugar" | "2 onions, very finely sliced" |

Scenario Outline: Crossed out grocery items
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to Grocery page for Session Testing
	And I click on <ingredient>
	When I signin in as the unique signin for Session Testing
	And I navigate to Grocery page for Session Testing
	Then I should see <ingredient> crossed out
	Examples:
	| item | num | radius | ingredient |
	| "burger" | "5" | "3" | "2 onions, very finely sliced" |

Scenario Outline: Saving Recipes to a list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to recipe <recipe> page for Session Testing
	And I save <recipe> to <list1> for Session Testing
	And I exit out of the browser for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to <list1> page for Session Testing
	Then I should see <recipe> for Session Testing
	Examples:
	| item | num | radius | recipe | list1 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "Favorite" |

Scenario Outline: Changing recipe to a different list
	Given I am on a unique signin for Session Testing
	And I navigate to <list1> page for Session Testing
	And I change <recipe> to <list2> for Session Testing
	And I exit out of the browser for Session Testing 
	When I signin in as the unique signin for Session Testing
	And I navigate to <list2> page for Session Testing
	Then I should see <recipe> for Session Testing
	Examples:
	| recipe | list1 | list2 |
	| "Halloumi aubergine burgers with harissa relish" | "Favorite" | "To Explore"|

Scenario Outline: Deleting recipe from the list
	Given I am on a unique signin for Session Testing
	And I navigate to <list1> page for Session Testing
	And I delete <recipe> from <list1> for Session Testing
	And I exit out of the browser for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to <list1> page for Session Testing
	Then I should not see <recipe> for Session Testing
	Examples:
	| recipe | list1 |
	| "Halloumi aubergine burgers with harissa relish" | "To Explore" |

Scenario Outline: Reorder recipe in a list
	Given I am on a unique signin for Session Testing
	And I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I move <recipe1> down below <recipe2>
	And I exit out of the browser for Session Testing
	When I signin in as the unique signin for Session Testing
	And I search for <item> with <num> amount and <radius> in miles for Session Testing
	Then I should see <recipe1> below <recipe2>
	Examples:
	| item | num | radius | recipe1 | recipe2 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" | "Grilled Monterey Jack Turkey Burger with Peaches and Blueberries" |

Scenario Outline: Confirming saved searches
	Given I am on a unique signin for Session Testing
	And I search for <item1> with <num> amount and <radius> in miles for Session Testing
	And I exit out of the browser for Session Testing
	When I signin in as the unique signin for Session Testing
	And I search for <item2> with <num> amount and <radius> in miles for Session Training 
	And I navigate to SavedSearches page for Session Testing 
	Then I should see <item1>
	Examples:
	| item1 | num | radius |item2 |
	| "burger" | "5" | "3" | "chinese" |