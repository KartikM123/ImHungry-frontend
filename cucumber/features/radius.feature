Feature:
	Test the amount of items given at certain radius

Background: 
	Given I am on the Register page of the I'm Hungry website for Radius Testing

Scenario Outline: Test for a radius that has satisfied num restaurants
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should see only <num> items for Radius Testing

	Examples:
	| item | num | radius |
	| "burger" | "5" | "3" |

Scenario Outline: Test for a small radius that has not found enough restaurants to reach num
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should see only <num1> items having searched <num> items for Radius Testing
	Examples:
	| item | num | radius | num1 |
	| "burger" | "5" | "1" | "2" |

Scenario Outline: Test for a fraction of a radius
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should see only <num1> items having searched <num> items for Radius Testing
	Examples:
	| item | num | radius | num1 |
	| "burger" | "5" | "0.1" | "1" |

Scenario Outline: Test for a negative invalid radius
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should remain on the Search page
	Examples:
	| item | num | radius |
	| "burger" | "5" | "-1" |

Scenario Outline: Test for a overly large invalid radius
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should remain on the Search page
	Examples:
	| item | num | radius |
	| "burger" | "5" | "9999" |

Scenario Outline: Test for a empty invalid radius
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should remain on the Search page
	Examples:
	| item | num | radius |
	| "burger" | "5" | " " |

Scenario Outline: Display appropriate error message for a 0 radius
	Given I am on a unique signin for Radius Testing
	When I search for <item> with <num> amount and <radius> in miles for Radius Testing
	Then I should see the error message <message> on the Results Page
	Examples:
	| item | num | radius | message |
	| "burger" | "5" | "0" | "No restaurants found in this radius." |