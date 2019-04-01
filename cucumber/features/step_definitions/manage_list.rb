Given(/^I am on the Lists Page of the I'm Hungry website$/) do
  visit 'localhost:3000/Favorite'
end


And(/^I should see a title of Favorite$/) do
	assert_text('Favorites')
end
And(/^I should see the Manage List button$/) do
   expect(page.has_button?('Manage List'))
end
And(/^I should see a Manage List dropdown, including all lists except current list$/) do
  expect(page.find('#list1drop').value =='blank')
end
And(/^I should see a Return To Results button$/) do
   expect(page.has_button?('Return to Results'))
end
And(/^I should see a Return To Search button$/) do
   expect(page.has_button?('Return to Search'))
end


When(/^I click on the dropdown$/) do
  find('select').click()
end
Then(/^I should see different lists, not including current list$/) do
  assert_text('Do Not Show') and assert_text('To Explore')
end

Given(/^I am on a valid signin$/) do
  visit 'localhost:3000/Register'
  fill_in 'username', :with => "test"
  fill_in 'password', :with => "test1"
  fill_in 'email', :with => "test@test.com"
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "test"
  fill_in 'password', :with => "test1"
  click_button("login")
end

Given(/^I am on the List management page for a <list> with <list_content> results$/) do
  visit 'localhost:3000/Favorite'
end
Then(/^I should see <list_content> items for recipe and restaurants$/) do
  expect(page).to have_css('td.restaurantCell', count: 1) 
  expect(page).to have_css('td.recipeCell', count: 1) 
end

Given(/^Favorites is shown$/) do
  visit 'localhost:3000/Favorite'
  assert_text('Favorites')
end
Then(/^I should be able to move <list_item> to Do Not Show$/) do
  visit 'localhost:3000/Favorite'
	find('move').click()
end


Then(/^I should be able to remove Item from Favorites$/) do
	find('remove').click()
end



