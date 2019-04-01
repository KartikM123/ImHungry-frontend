Given(/^I am on the Recipe Page of the I'm Hungry website$/) do
	visit('localhost:3000/Recipe')
end

Then(/^I should see the prep time$/) do
	assert_text('Prep Time:')
end

Then(/^I should see the cook time$/) do
	assert_text('Cook Time:')
end

Then(/^I should see the dish image$/) do
	page.should have_css('#rcpimg')
end

Then(/^I should see the ingredients title$/) do
	assert_text('Ingredients:')
end

Then(/^I should see the instructions title$/) do
	assert_text('Instructions:')
end

Then(/^I should see a white smoke background for the "([^"]*)" page$/) do |arg1|
 color = find('.'+arg1).native.css_value('background-color')
 expect(color).to eq('rgba(245, 245, 245, 1)')
end

Given(/^I am on the Recipe page for recipe "([^"]*)" from search "([^"]*)" with count "([^"]*)"$/) do |arg1, arg2, arg3|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => arg2
  fill_in 'amount', :with => arg3
  find('#pik').click
  find('div.recrow1', :text => arg1).click
end

Then(/^I should see recipe title "([^"]*)"$/) do |arg1|
	assert_text(arg1)
end


Then(/^I should see prep "([^"]*)" and cook "([^"]*)" times$/) do |arg1, arg2|
	assert_text(arg1)
	assert_text(arg2)
end

Then(/^I should see ingredients "([^"]*)" and "([^"]*)" and "([^"]*)"$/) do |string, string2, string3|
	assert_text(string)
	assert_text(string2)
	assert_text(string3)
end

Then(/^I should see instructions "([^"]*)" and "([^"]*)"$/) do |arg1, arg2|
	assert_text(arg1)
	assert_text(arg2)
end
