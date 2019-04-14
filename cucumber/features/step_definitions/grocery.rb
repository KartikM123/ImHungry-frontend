Given("I am on the Recipe page for recipe {string} from search {string} with count {string} logged in") do |string, string2, string3|
  fill_in 'query', :with => string2
  fill_in 'radius', :with => 10000
  find('#feedme').click
  find('font', text: string, exact: true).click
end

When("I add the ingredient {string}") do |string|
  find('span', text: string).click
  find('#add').click
end

When("I navigate to the Grocery page") do
  find('#rightDrawer').click
  find('#resrp').click
  find('#drawer').click
  find('#grocery').click
end

Then("I should see the Grocery page with {string}") do |string|
	assert_text('Grocery List')
	assert_text(string)
end

When("I add the {string} from the Recipe page") do |string|
    fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 10000
    find('#feedme').click
    find('font', text: 'Halloumi aubergine burgers with harissa relish', exact: true).click
  	find('span', text: string).click
  	find('#add').click
end

Given("I am on the Grocery page") do
    fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 10000
    find('#feedme').click
    find('font', text: 'Halloumi aubergine burgers with harissa relish', exact: true).click
    visit 'localhost:3000/Grocery'
end

When("I delete the {string}") do |string|
  brownie = find_all('span', text: string)
  brownie.each { |brown|
    brown.click
  }
  find('#delete').click
end

Then("I should not see the deleted {string}") do |string|
  expect(page).not_to have_content(string)
end