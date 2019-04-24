Feature:
	Maintain information beyond sessions at a time to indicate data is being recorded

Background: 
	Given I am on the Register page of the I'm Hungry website for Session Testing

Scenario Outline: Saving Restaurants to a list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to restaurant <restaurant> page for Session Testing
	And I save restaurant <restaurant> to list <list1> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	Then I should see restaurant <restaurant> for Session Testing
	Examples:
	| item | num | radius | restaurant | list1 |
	| "burger" | "5" | "3" | "The Habit Burger Grill" |  "Favorites" |

Scenario Outline: Changing restaurant to a different list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	And I change restaurant <restaurant> to list <list2> for Session Testing
	And I logout of the account for Session Testing 
	When I signin in as the unique signin for Session Testing
	And I navigate to list <list2> page for Session Testing
	Then I should see restaurant <restaurant> for Session Testing
	Examples:
	| restaurant | list1 | list2 | item | num | radius |
	| "The Habit Burger Grill" | "Favorites" | "To Explore"| "burger" | "5" | "3" |

Scenario Outline: Deleting restaurant from the list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	And I delete restaurant <restaurant> from list <list1> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	Then I should not see restaurant <restaurant> for Session Testing
	Examples:
	| restaurant | list1 | item | num | radius |
	| "The Habit Burger Grill" | "To Explore" | "burger" | "5" | "3" |

@long
Scenario Outline: Save Grocery information
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to recipe <recipe> page for Session Testing
	And I save ingredients <ingredient1> and <ingredient2> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to Grocery page for Session Testing
	Then I should see <ingredient1> and <ingredient2> for Session Testing

	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient2|
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "1 tbsp soft brown sugar" | "2 onions, very finely sliced" |
@long
Scenario Outline: Delete Grocery
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to Grocery page for Session Testing
	And I delete ingredient <ingredient1> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to Grocery page for Session Testing
	Then I should not see <ingredient1> and see <ingredient2> for Session Testing
	Examples:
	| item | num | radius | recipe | ingredient1 | ingredient2 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "1 tbsp soft brown sugar" | "2 onions, very finely sliced" |
@long
Scenario Outline: Check out grocery items
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to Grocery page for Session Testing
	And I check on <ingredient> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to Grocery page for Session Testing
	Then I should see <ingredient> checked out for Session Testing
	Examples:
	| item | num | radius | ingredient |
	| "burger" | "5" | "3" | "2 onions, very finely sliced" |
@long
Scenario Outline: Saving Recipes to a list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to recipe <recipe> page for Session Testing
	And I save recipe <recipe> to list <list1> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	Then I should see recipe <recipe> for Session Testing
	Examples:
	| item | num | radius | recipe | list1 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" |  "Favorites" |
@long
Scenario Outline: Changing recipe to a different list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	And I change recipe <recipe> to list <list2> for Session Testing
	And I logout of the account for Session Testing 
	When I signin in as the unique signin for Session Testing
	And I navigate to list <list2> page for Session Testing
	Then I should see recipe <recipe> for Session Testing
	Examples:
	| recipe | list1 | list2 | item | num | radius |
	| "Halloumi aubergine burgers with harissa relish" | "Favorites" | "To Explore"| "burger" | "5" | "3" |

Scenario Outline: Deleting recipe from the list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	And I delete recipe <recipe> from list <list1> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to list <list1> page for Session Testing
	Then I should not see recipe <recipe> for Session Testing
	Examples:
	| recipe | list1 | item | num | radius |
	| "Halloumi aubergine burgers with harissa relish" | "To Explore" | "burger" | "5" | "3" |
@long
Scenario Outline: Reorder items in a list
	Given I am on a unique signin for Session Testing
	When I search for <item> with <num> amount and <radius> in miles for Session Testing
	And I navigate to recipe <recipe1> page for Session Testing
	And I save recipe <recipe1> to list <list1> for Session Testing
	And I navigate to restaurant <restaurant1> page for Session Testing
	And I save restaurant <restaurant1> to list <list1> for Session Testing
	And I navigate to list <list1> page for Session Testing
	And I move recipe <recipe1> above restaurant <restaurant1> for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	And I navigate to list <list1> page for Session Testing
	Then I should see recipe <recipe1> above restaurant <restaurant1> for Session Testing
	Examples:
	| item | num | radius | recipe1 | restaurant1 | list1 |
	| "burger" | "5" | "3" | "Halloumi aubergine burgers with harissa relish" | "The Habit Burger Grill" | "Favorite" |
@long
Scenario Outline: Confirming saved searches for Session Testing
	Given I am on a unique signin for Session Testing
	When I search for <item1> with <num> amount and <radius> in miles for Session Testing
	And I logout of the account for Session Testing
	When I signin in as the unique signin for Session Testing
	When I search for <item2> with <num> amount and <radius> in miles for Session Testing
	Then I should see saved search <item1> for Session Testing
	Examples:
	| item1 | num | radius | item2 |
	| "burger" | "5" | "3" | "chinese" |