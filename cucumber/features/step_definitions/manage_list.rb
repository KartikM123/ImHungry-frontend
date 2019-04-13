Given(/^I am on the Lists Page of the I'm Hungry website$/) do
  visit 'localhost:3000/Favorite'
end


And(/^I should see a title of Favorite$/) do
  visit 'localhost:3000/Favorite'
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
  assert_text('NoShow') and assert_text('ToExplore')
end

Given(/^I am on a valid signin$/) do
  visit 'localhost:3000/Register'
  fill_in 'username', :with => "fsss"
  fill_in 'password', :with => "fsss1"
  fill_in 'email', :with => "fsss@fs1.edu"
  click_button('Register')
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "fsss"
  fill_in 'password', :with => "fsss1"
  click_button("login")
  expect(page).to have_current_path(/Search/)
  visit 'localhost:3000/Favorite'
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

Then(/^I should be able to remove item from Favorites$/) do
  visit 'localhost:3000/Favorite'
  assert_text('Remove')
  click_button('Remove')
end
Then(/^I should be able to move "([^"]*)" from Favorites to To Explore$/) do |arg1|
  visit 'localhost:3000/Favorite'
  find_by_id('select-resdrop').click()
  find_by_id('toExplore').click()  
  click_button('Move')
  select('ToExplore', from: 'list1drop')
  click_button('Manage List')
  assert_text('To Explore')
  assert_text(arg1)
  select('Favorite', from: 'list1drop')
  click_button('Manage List')
end

Then(/^I should be able to move item from Favorites to To Explore$/) do
  visit 'localhost:3000/Favorite'
  assert_text('Move')
  select('ToExplore', from: 'list1drop')
  click_button('Manage List')
  assert_text('To Explore')
  select('Favorite', from: 'list1drop')
  click_button('Manage List')
end

Then(/^I should add to Favorites$/) do
  find_by_id('resdrop').click()
  select('Favorite', from: 'resdrop')
  click_button('Add to List')
end
Given(/^I remove item$/) do
  visit 'localhost:3000/Favorite'
  assert_text('Favorites')
end


Given(/^I am on a unique signin$/) do
  visit 'localhost:3000/Register'
  fill_in 'username', :with => "spec"
  fill_in 'password', :with => "spec1"
  fill_in 'email', :with => "s@s.edu"
  click_button('Register')
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "spec"
  fill_in 'password', :with => "spec1"
  click_button("login")
  expect(page).to have_current_path(/Search/)
end
Given(/^I search for Burger$/) do
  visit 'localhost:3000/Search'
  fill_in 'query', :with => 'burger'
  fill_in 'radius', :with => 10000
  click_button("Feed Me!")
  expect(page).to have_current_path(/Result/)
end
Then(/^I add a Restaurant$/) do
  visit 'localhost:3000/Result'
  find_by_id("ChIJRaPCphDHwoARRKD4kcOtCA0").click()
 # find('div.col1.ChIJRaPCphDHwoARRKD4kcOtCA0', :text => "The Habit Burger Grill").click
  find_by_id("rightDrawer").click()

  find_by_id('select-resdrop').click()
  find_by_id('fav').click()
  click_button('Add to List')
end
Then(/^I add a Recipe$/) do
  visit 'localhost:3000/Result'
  find_by_id("219871").click()
  #find('div.col2.219871', :text => "Halloumi aubergine burgers with harissa relish").click
  find_by_id("rightDrawer").click()

  find_by_id('select-resdrop').click()
  find_by_id('fav').click()
  click_button('Add to List')
end

Then(/^click down should move restaurant down$/) do
  find_by_id("downres").click()
  page.should have_css('div#res1')
end

Then(/^click up should move restaurant up$/) do
  find_by_id("upres").click()
  page.should have_css('div#res0')
end
Then(/^click up should move recipe up$/) do
  find_by_id("downrec").click()
  page.should have_css('div#res0')
end
Then(/^click down should move recipe down$/) do
  find_by_id("uprec").click()
  page.should have_css('div#res1')
end
Then(/^page should clean$/) do
  find_by_id("removeres").click()
  find_by_id("removerec").click()
end  


  
# Scenario Outline: page design for a specific outline
#   Given I am on a valid signin
#   Given I am on the Restaurant page for restaurant <id> from search <food> with count <numresult> 
#   When I select <list> in the dropdown
#   And I select the Add to List button
#   Then I should see item <name> in list <list>
  
#   Examples:
  
#   | food | numresult | id | name | list |
#   | "burger" | "5" | "ChIJRaPCphDHwoARRKD4kcOtCA0" | "The Habit Burger Grill" | "Favorites" |
#   | "burger" | "5" | "ChIJj8k3FDnGwoARYPPFbgkxVqQ" | "Umami Burger Arts District" | "Do Not Show" |
#   | "burger" | "5" | "219871" | "Halloumi aubergine burgers with harissa relish" | "To Explore" |



