Feature:
	Login to website

Background: 
	Given I am on the SignIn page of the I'm Hungry website

Scenario: page design
	Then I should see a text field for username
	And I should see a text field for password
	And I should see a signin button
	And I should see a register button

Scenario Outline: press register button
	When I press Register
	Then I should be on the Register Page

Scenario Outline: try form with well formed inputs
	Given I am on a unique signin
	Then I should be on the Search Page

	Examples:
	| username | password |
	| "ericdchoi" | "eric's password" |

Scenario Outline: try form without a username
	When I search in for <username> and <password>
	And I press Sign In
	Then I should be on the Login Page
	
	Examples:
	| username | password |
	| "    " | "eric's password" |
	| "" | "kartik's password" |

Scenario Outline: try form without a password
	When I search in for <username> and <password>
	And I press Sign In
	Then I should be on the Login Page
	
	Examples:
	| username | password |
	| "ericchoi" | "" |
	| "kartikmahajan" | "    " |


Scenario Outline: try form with a invalid password and username
	When I search in for <username> and <password>
	And I press Sign In
	Then I should be on the Login Page
	Examples:
	| username | password |
	| "ericchoi" | "kartik's password" |
	| "kartikmahajan" | "eric's password" |




