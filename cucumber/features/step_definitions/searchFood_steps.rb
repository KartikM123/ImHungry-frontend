Given(/^I am on the Search Page of the I'm Hungry website$/) do
  visit 'localhost:3000/Search'
end

Given(/^I just started the server$/) do
  visit 'localhost:3000'
end

When(/^I search for "([^"]*)" from the search page$/) do |arg1|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => arg1
  fill_in 'radius', :with => 3
  find('#feedme').click

end

When(/^I search for "([^"]*)"$/) do |arg1|
  fill_in 'query', :with => arg1
end

When(/^I search for "([^"]*)" in the number box$/) do |arg1|
  fill_in 'amount', :with => ""
  fill_in 'amount', :with => arg1
end

When(/^I search for "([^"]*)" in the radius box$/) do |arg1|
  fill_in 'radius', :with => arg1
end

When(/^I press Submit$/) do
  find('#feedme').click
end

Then(/^I should be on the Results Page for "([^"]*)" with "([^"]*)"$/) do |arg1, arg2|
  assert_text("Results for: "+arg1)

end

Then(/^I should see the Search Page$/) do
  assert_text("I'm Hungry")
end


Then(/^I should see a I'm Hungry title$/) do
#3em is 48px in Chrome
 fontsize = find('h1', text: "I'm Hungry").native.css_value('font-size')
 assert_text("I'm Hungry") and expect(fontsize).to be >('16px')
end

Then(/^I should see a text field for food$/) do
 expect(page.has_field?('q',with: 'Enter Food', type: text))
end

Then(/^I should see a field for number$/) do
 expect(page.has_field?('num', with: '5', type: 'number'))
end

Then(/^I should see a submit button$/) do
 expect(page.has_button?('Feed Me!'))
end