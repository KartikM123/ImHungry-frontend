Given("I am on the Register page of the I'm Hungry website") do
  visit 'localhost:3000/Register'
end

Then("I should see a text field for email") do
  expect(page.has_field?('email', type: text))
end

Then("I should see a back-to-sign-in button") do
  expect(page.has_button?('#login'))
end

When("I register for {string} and {string} and {string}") do |string, string2, string3|
  visit 'localhost:3000/Register'
  fill_in 'username', :with => string
  fill_in 'password', :with => string2
  fill_in 'email', :with => string3
end

When("I press Register") do
  click_button("register")
end

Then("I should be on the Register Page") do
  expect(page).to have_current_path(/Register/)
end

When("I register a new, uncreated user") do
  visit 'localhost:3000/Register'
  name = Time.now.to_i.to_s
  fill_in 'username', :with => name
  fill_in 'password', :with => name
  fill_in 'email', :with => name + "@" + name
end