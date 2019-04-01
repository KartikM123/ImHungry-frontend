Given(/^I am on the Results Page of the I'm Hungry website$/) do
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'amount', :with => 5
  find('#pik').click
end

Then(/^I should see the Restaurant and Recipe titles$/) do
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'amount', :with => 5
  find('#pik').click
  fontsize1 = find_by_id('reshead').native.css_value('font-size')
  fontsize2 = find_by_id('rechead').native.css_value('font-size')
  assert_text('Restaurant') and assert_text('Recipe') and expect(fontsize1).to eq(fontsize2) and expect(fontsize1).to be >('20px')
end

Then(/^I should see a blank dropdown as default$/) do

  expect(page.find_by_id('resdrop').value =='')

end

When(/^I click on the dropdown$/) do
  find_by_id('resdrop').click()

end

Then(/^I should see the different lists$/) do
  assert_text('Favorites') and assert_text('Do Not Show') and assert_text('To Explore')
end

Given(/^I am on the Result page for a "([^"]*)" with "([^"]*)" results$/) do |arg1, arg2|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'amount', :with => 5
  find('#pik').click
end

Then(/^I should see "([^"]*)" items for recipe and restaurants$/) do |arg1|
  expect(page).to have_css('.recrow1', count: arg1) 
end

Then(/^I should see "([^"]*)" restaurant names$/) do |arg1|
  expect(page).to have_css('font.restaurantname', count: arg1) 
end

Then(/^I should see "([^"]*)" restaurant address$/) do |arg1|
    expect(page).to have_css('small.address', count: arg1) 
end

Then(/^I should see "([^"]*)" minutes of driving to get to the restaurant$/) do |arg1|
  expect(page).to have_css('small.distance', count: arg1) 
end

Then(/^I should see "([^"]*)" price of the restaurant$/) do |arg1|
  expect(page).to have_css('small#price', count: arg1) 
end

Then(/^I should see "([^"]*)" recipe name$/) do |arg1|
  expect(page).to have_css('font.recipename', count: arg1) 
end

Then(/^I should see "([^"]*)" cook and prep time of the recipe$/) do |arg1|
  expect(page).to have_css('small.preptime', count: arg1) and   expect(page).to have_css('small.cooktime', count: arg1) 
end

When(/^I select the restaurant "([^"]*)" result$/) do |arg2|
visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'amount', :with => 5
  find('#pik').click
  find('font.restaurantname', text: arg2, match: :prefer_exact).click
end

When(/^I select the recipe "([^"]*)" result$/) do |arg2|
visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'amount', :with => 5
  find('#pik').click
  page.find('font.recipename', text: arg2, match: :prefer_exact).click
end

Then(/^I should see the Result Page the restaurant "([^"]*)" result$/) do |arg2|
  find('h1').native.text.should have_content(arg2) and  expect(page).to have_current_path("/Restaurant")
end


Then(/^I should see the Result Page for the recipe "([^"]*)" result$/) do |arg2|
  find('h1').native.text.should have_content(arg2) and expect(page).to have_current_path("/Recipe")
end

When(/^the dropdown is blank$/) do
 select('', from: 'resdrop')

end

When(/^I select the Manage List button$/) do
  find('button#list').click
end

Then(/^I remain on the Results Page$/) do
  expect(page).to have_current_path('/Result')
end

When(/^I select "([^"]*)" in the dropdown$/) do |arg1|
  select(arg1, from: 'resdrop')
end

Then(/^I should be on the Manage List Page for "([^"]*)"$/) do |arg1|
  assert_text(arg1)
end

When(/^I click on Return to Search Page$/) do
  click_on('Return to Search')
end

Then(/^I should be on the Search Page$/) do
  expect(page).to have_current_path('/Search')
end


Then(/^I should see restaurant "([^"]*)" at the top of the list$/) do |arg1|
  first('td.restaurantName').assert_text(arg1)
end

Then(/^I should see recipe "([^"]*)" at the top of the list$/) do |arg1|
  first('td.recipeName').assert_text(arg1)
end

Then(/^I should not see "([^"]*)"$/) do |arg1|
  assert_no_text(arg1)
end


Then(/^I should see buttons on the bottom$/) do
	assert_text('1') and expect(page).to have_css('li.previous', count: 1) and expect(page).to have_css('li.next', count: 1)
end


When(/^I press the next button$/) do
  find('li.next').click
end

