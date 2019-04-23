Given("I am on the Register page of the I'm Hungry website for Saved Searches Testing") do
  visit 'localhost:3000/Register'
end
Given("I am on a unique signin for Saved Searches Testing") do
  fill_in 'username', :with => "saved"
  fill_in 'password', :with => "saved"
  fill_in 'email', :with => "saved@usc.edu"
  click_button('register')
  sleep(2.to_i)
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "saved"
  fill_in 'password', :with => "saved"
  click_button('login')
  expect(page).to have_current_path('/Search')
end

When("I search for the {string} with {string} amount and {string} in miles for Saved Searches Testing") do |string, string2, string3|
  fill_in 'query', :with => string
  fill_in('amount', :with => '')
  fill_in('amount', :with => string2)
  fill_in "radius", with: string3
  find('#feedme').click
end

When("I navigate back to Search Page for Saved Searches testing") do
  visit 'localhost:3000/Search'
  expect(page).to have_current_path('/Search')
end

Then("I should see search result {string} for Saved Searches Testing") do |string|
  find('div.ssearch').assert_text(string)
end

When("I click on search result {string} for Saved Searches Testing") do |string|
  first('div.ssearch').first('div', text: string).first(:xpath,"..").first('button').click
end

Then("I should see only {string} items") do |string|
  brownie = find('div.col1').find_all('div')
  puts brownie.length
  brownie.length === string.to_i
end