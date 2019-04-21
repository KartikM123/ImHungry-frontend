Given("I am on the Result page for a {string} with {string} results with {string} radius") do |string, string2, string3|
   fill_in 'query', :with => string
   fill_in 'radius', :with => 3
   find('#feedme').click
end

When("I navigate to the Saved Search page") do
  find('#drawer').click
  find('#saved').click
end

Then("I should see Saved Search page with {string} with {string} results with {string} radius") do |string, string2, string3|
  assert_text(string)
  assert_text(string2)
  assert_text(string3)
end

When("I search for {string} with {string} results with {string} radius") do |string, string2, string3|
  fill_in 'query', :with => string
  fill_in 'radius', :with => 3
  find('#feedme').click
end

Given("I am on the Saved Search page") do
	fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 3
    find('#feedme').click
	visit 'localhost:3000/SavedSearch'
end

When("I click on the row with {string} with {string} results with {string} radius") do |string, string2, string3|
  find('td', text: string).click
end
