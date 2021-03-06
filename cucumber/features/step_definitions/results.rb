Given(/^I am on the Results Page of the I'm Hungry website$/) do
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'radius', :with => 3
  find('#feedme').click
end

Then(/^I should see the Restaurant and Recipe titles$/) do
  visit 'localhost:3000/Search'
  sleep(2.to_i)
  fill_in 'query', :with => 'burger'
  fill_in 'radius', :with => 3
  find('#feedme').click
  fontsize1 = find_by_id('reshead').native.css_value('font-size')
  fontsize2 = find_by_id('rechead').native.css_value('font-size')
  assert_text('Restaurant') and assert_text('Recipe') and expect(fontsize1).to eq(fontsize2) and expect(fontsize1).to be >('20px')
end

Then(/^I should see a blank dropdown as default$/) do
  open_drawer
  expect(page.find_by_id('listdrop').value =='')
end

When(/^I select on the dropdown$/) do
  open_drawer
  find_by_id('listdrop').click()

end

Then(/^I should see the different lists$/) do
  assert_text('Favorites') and assert_text('Do Not Show') and assert_text('To Explore')
end

Given(/^I am on the Result page for a "([^"]*)" with "([^"]*)" results$/) do |arg1, arg2|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'radius', :with => 3
  find('#feedme').click
end 

Then(/^I should see "([^"]*)" items for recipe and restaurants$/) do |arg1|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'radius', :with => 3

  find('#feedme').click
  expect(page).to have_css('.row4', count: 2) 
end

Then(/^I should see "([^"]*)" restaurant names$/) do |arg1|
  expect(page).to have_css('font.restaurantname', count: arg1) 
  page.should have_css('.row4')
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
  page.should have_css('.row4')
end

Then(/^I should see "([^"]*)" cook and prep time of the recipe$/) do |arg1|
  expect(page).to have_css('small.preptime', count: arg1) and   expect(page).to have_css('small.cooktime', count: arg1) 
end

When(/^I select the restaurant "([^"]*)" result$/) do |arg2|

  find('font.restaurantname', text: arg2).click
end

When(/^I select the recipe "([^"]*)" result$/) do |arg2|
  page.find('font.recipename', text: arg2).click
end

Then(/^I should see the Result Page the restaurant "([^"]*)" result$/) do |arg2|
  find('h1').native.text.should have_content(arg2) and  expect(page).to have_current_path("/Restaurant")
end


Then(/^I should see the Result Page for the recipe "([^"]*)" result$/) do |arg2|
  find('h1').native.text.should have_content(arg2) and expect(page).to have_current_path("/Recipe")
end

When(/^the dropdown is blank$/) do
  open_drawer
end

When(/^I select the Manage List button$/) do
  find('#list').click
end

Then(/^I remain on the Results Page$/) do
  expect(page).to have_current_path('/Result')
end

When(/^I select "([^"]*)" in the dropdown$/) do |arg1|

  open_drawer
  find('#listdrop', visible: false).click
  find('li', text:arg1, visible:false).click

end

Then(/^I should be on the Manage List Page for "([^"]*)"$/) do |arg1|
  assert_text(arg1)
end

When(/^I click on Return to Search Page$/) do
  open_drawer
  click_on('Return to Search')
end

Then(/^I should be on the Search Page$/) do
  expect(page).to have_current_path('/Search')
end


Then(/^I should see restaurant "([^"]*)" at the top of the list$/) do |arg1|
  first('font.restaurantName').assert_text(arg1)
end

Then(/^I should see recipe "([^"]*)" at the top of the list$/) do |arg1|
  first('font.recipeName').assert_text(arg1)
end

Then(/^I should not see "([^"]*)"$/) do |arg1|
  assert_text(arg1)
end

When(/^I press the next button$/) do
  find('li.next').click
end

Given("I am on the Result page for a {string}{int} results") do |string, int|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'radius', :with => 3
  click_button("Feed Me!")
end

def open_drawer
  begin
    find('#drawer').click
  rescue Capybara::ElementNotFound
    find('#rightDrawer').click
  end
end