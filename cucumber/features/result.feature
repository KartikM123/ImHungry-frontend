Feature:
	View restaurant and recipe results

Background: 
	Given I am on the Results Page of the I'm Hungry website

Scenario Outline: General page design
	Given I am on the Result page for a <food> with <numresult> results
<<<<<<< HEAD
	Then I should see a white smoke background
	And I should see the Manage List button
=======
	Then I should see the Manage List button
>>>>>>> cucumber
	And I should see a Return To Search button
	And I should see the Restaurant and Recipe titles
	
	Examples:
	| food | numresult |
	| "burger" | "5" |
	
@test2
Scenario Outline: Dropdown default
	Given I am on the Result page for a <food> with <numresult> results
	Then I should see a blank dropdown as default
	
	Examples:
	| food | numresult |
	| "burger" | "5" |

Scenario Outline: Dropdown options
	Given I am on the Result page for a <food> with <numresult> results
	When I select on the dropdown
	Then I should see the different lists
	
	Examples:
	| food | numresult |
	| "burger" | "5" |

Scenario Outline: page design for a specific outline
	Given I am on the Result page for a <food> with <numresult> results
	Then I should see <numresult> items for recipe and restaurants

	Examples:
	| food | numresult |
	| "burger" | "5" |

Scenario Outline: Pagination
	Given I am on the Result page for a <food> with <numresult> results
	Then I should see buttons on the bottom
	
	Examples:
	| food | numresult |
	| "burger" | "5" |

Scenario Outline: Pagination functions for more than five results
	Given I am on the Result page for a <food> with <numresult> results
	Then I should see <numresult> items for recipe and restaurants

	Examples:
	| food | numresult | perPage |
<<<<<<< HEAD
	| "burger" | "2" | "2" |
=======
	| "burger" | "5" | "5" |
>>>>>>> cucumber

Scenario Outline: Using Pagination buttons
	Given I am on the Result page for a <food> with <numresult> results
	When I press the next button
	Then I should see <perPage> restaurant names
	And I should see <perPage> restaurant address

	Examples:
	| food | numresult | perPage |
<<<<<<< HEAD
	| "burger | "2" | "2" |
=======
	| "burger | "5" | "5" |
>>>>>>> cucumber

Scenario Outline: Restaurant information
	Given I am on the Result page for a <food> with <numresult> results
	Then I should see <numresult> restaurant names
	And I should see <numresult> restaurant address
	And I should see <numresult> minutes of driving to get to the restaurant
	And I should see <numresult> price of the restaurant

	Examples:
	| food | numresult |
<<<<<<< HEAD
	| "burger" | "2" |
=======
	| "burger" | "5" |
>>>>>>> cucumber


Scenario Outline: Recipe information
	Given I am on the Result page for a <food> with <numresult> results
	Then I should see <numresult> recipe name
	And I should see <numresult> cook and prep time of the recipe

	Examples:
	| food | numresult |
<<<<<<< HEAD
	| "burger" | "2" |
=======
	| "burger" | "5" |
>>>>>>> cucumber

Scenario Outline: selecting a restaurant result
	Given I am on the Result page for a <food> with <numresult> results
	When I select the restaurant <result> result
	Then I should see the Result Page the restaurant <result> result

	Examples:
	| food | numresult | result |
<<<<<<< HEAD
	| "burger" | "2" | "The Habit Burger Grill" |
=======
	| "burger" | "5" | "The Habit Burger Grill" |
>>>>>>> cucumber

Scenario Outline: selecting a recipe result
	Given I am on the Result page for a <food> with <numresult> results
	When I select the recipe <result> result
	Then I should see the Result Page for the recipe <result> result

	Examples:
	| food | numresult | result |
<<<<<<< HEAD
	| "burger" | "2" | "Halloumi aubergine burgers with harissa relish" |
=======
	| "burger" | "5" | "Halloumi aubergine burgers with harissa relish" |
>>>>>>> cucumber


Scenario Outline: selecting Manage List with nothing chosen
	Given I am on the Result page for a <food> with <numresult> results
	When the dropdown is blank
	And I select the Manage List button
	Then I remain on the Results Page
	
	Examples:
	| food | numresult |
<<<<<<< HEAD
	| "burger" | "2" |
=======
	| "burger" | "5" |
>>>>>>> cucumber

Scenario Outline: Selecting Back to Search
	Given I am on the Result page for a <food> with <numresult> results
	When I click on Return to Search Page
	Then I should be on the Search Page
	
	Examples:
	| food | numresult |
	| "burger" | "5" |