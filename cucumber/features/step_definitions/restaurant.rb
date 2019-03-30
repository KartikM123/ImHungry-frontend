Given(/^I am on the Restaurant Page of the I'm Hungry website$/) do
	visit 'localhost:3000/restaurant_info.jsp'
end
      
Then(/^I should see the Printable Version button$/) do
	expect(page.has_button?('Printable Version'))
end
      
Then(/^I should see the Back to Results button$/) do
	expect(page.has_button?('Return to Search'))
end

Then(/^I should see the Add to List button$/) do
	expect(page.has_button?('Add to List'))
end

Then(/^I should see the website link$/) do
	expect(page.has_link?('Restaurant website and additional information'))
end

Then(/^I should see the Address title$/) do
	assert_text('Address')
end

Then(/^I should see the Phone Number title$/) do
	assert_text('Phone Number')
end

Given(/^I am on the Restaurant page for restaurant "([^"]*)" from search "([^"]*)" with count "([^"]*)"$/) do |arg1, arg2, arg3|
	visit 'localhost:8080/Search?q='+arg2+'&num='+arg3
	visit 'localhost:8080/RestaurantInfo?id='+arg1 
end

Then(/^I should see name "([^"]*)"$/) do |arg1|
	assert_text(arg1)
end

Then(/^I should see address$/) do
	expect(page).to have_css('td.address')
end

Then(/^I should see phone number$/) do
	expect(page).to have_css('td.phoneNumber')
end

Then(/^I should see the link "([^"]*)" to google maps$/) do |arg1|
	expect(page.find('a#address')[:href]).to include(arg1)
end

Then(/^I should see the link "([^"]*)" to the website$/) do |arg1|
	expect(page.find('a#site_link')[:href]).to include(arg1)
end

Then(/^I should remain on the Restaurant Page$/) do 
	expect(page).to have_current_path('/restaurant_info.jsp')
end

When(/^I select the Add to List button$/) do
	click_on('Add to List')
end

Then(/^I select the Back to Results button$/) do
	click_on('Back to Results')
end

Then(/^I should see the Results Page for "([^"]*)"$/) do |arg1|
	page.should have_content('Results for '+arg1)
end

Then(/^I should see item "([^"]*)" in list "([^']*)"$/) do |arg1, arg2|
	#expect correct list page
	page.should have_content(arg2)
	page.should have_content(arg1)
end

Given(/^I select the Printable Version button$/) do
	click_on('Printable Version')
end

Then(/^the page should be a printable version$/) do
	page.should have_no_content('table#dropdownButtons')
end