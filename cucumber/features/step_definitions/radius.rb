Given("I am on the Register page of the I'm Hungry website for Radius Testing") do
  visit 'localhost:3000/Register'
end

Given("I am on a unique signin for Radius Testing") do
  fill_in 'username', :with => "radius"
  fill_in 'password', :with => "radius"
  fill_in 'email', :with => "radius@usc.edu"
  click_button('register')
  sleep(2.to_i)
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "radius"
  fill_in 'password', :with => "radius"
  click_button('login')
  expect(page).to have_current_path('/Search')
end

When("I search for {string} with {string} amount and {string} in miles for Radius Testing") do |string, string2, string3|
  fill_in 'query', :with => string
  fill_in('amount', :with => '')
  fill_in('amount', :with => string2)
  fill_in "radius", with: string3
  find('#feedme').click
end

Then("I should see only {string} items for Radius Testing") do |string|
  brownie = find('div.col1').find_all('div')
  puts brownie.length
  brownie.length === string.to_i
end

Then("I should see only {string} items having searched {string} items for Radius Testing") do |string, string2|
  brownie = find('div.col1').find_all('div')
  puts brownie.length
  brownie.length === string.to_i
end

Then("I should remain on the Search page"){
	expect(page).to have_current_path('/Search')
}